import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { success, error } from '../utils/apiResponse';
import { env } from '../config/env';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      error(res, 'Email or username already exists', 409);
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
      select: { id: true, email: true, username: true, createdAt: true },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh',
      sameSite: 'strict',
      secure: env.CLIENT_URL.startsWith('https'),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('auth', 'true', {
      httpOnly: false,
      sameSite: 'strict',
      secure: env.CLIENT_URL.startsWith('https'),
      maxAge: 15 * 60 * 1000,
    });

    success(res, { user, accessToken }, 'User registered successfully', 201);
  } catch (err) {
    error(res, 'Registration failed', 500, err);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      error(res, 'Invalid credentials', 401);
      return;
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh',
      sameSite: 'strict',
      secure: env.CLIENT_URL.startsWith('https'),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('auth', 'true', {
      httpOnly: false,
      sameSite: 'strict',
      secure: env.CLIENT_URL.startsWith('https'),
      maxAge: 15 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = user;
    success(res, { user: userWithoutPassword, accessToken }, 'Login successful');
  } catch (err) {
    error(res, 'Login failed', 500, err);
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      error(res, 'Refresh token not found', 401);
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      error(res, 'Invalid or expired refresh token', 401);
      return;
    }

    const accessToken = generateAccessToken(decoded.userId);

    success(res, { accessToken }, 'Token refreshed successfully');
  } catch (err) {
    error(res, 'Token refresh failed', 401, err);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.clearCookie('auth');

    success(res, null, 'Logout successful');
  } catch (err) {
    error(res, 'Logout failed', 500, err);
  }
};
