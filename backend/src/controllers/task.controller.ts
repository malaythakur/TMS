import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { success, error } from '../utils/apiResponse';
import { taskQuerySchema } from '../validators/task.validator';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const parsed = taskQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      error(res, 'Invalid query parameters', 400, parsed.error.flatten().fieldErrors);
      return;
    }

    const { page, limit, status, priority, search, sortBy, sortOrder } = parsed.data;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortOrder } }),
      prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    success(res, {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    error(res, 'Failed to fetch tasks', 500, err);
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const task = await prisma.task.findFirst({ where: { id, userId } });

    if (!task) {
      error(res, 'Task not found', 404);
      return;
    }

    success(res, task);
  } catch (err) {
    error(res, 'Failed to fetch task', 500, err);
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        userId,
      },
    });

    success(res, task, 'Task created successfully', 201);
  } catch (err) {
    error(res, 'Failed to create task', 500, err);
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const existingTask = await prisma.task.findFirst({ where: { id, userId } });

    if (!existingTask) {
      error(res, 'Task not found', 404);
      return;
    }

    const { title, description, status, priority, dueDate } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
    });

    success(res, task, 'Task updated successfully');
  } catch (err) {
    error(res, 'Failed to update task', 500, err);
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const task = await prisma.task.findFirst({ where: { id, userId } });

    if (!task) {
      error(res, 'Task not found', 404);
      return;
    }

    await prisma.task.delete({ where: { id } });

    success(res, null, 'Task deleted successfully');
  } catch (err) {
    error(res, 'Failed to delete task', 500, err);
  }
};

export const toggleTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const task = await prisma.task.findFirst({ where: { id, userId } });

    if (!task) {
      error(res, 'Task not found', 404);
      return;
    }

    const statusCycle: Record<string, string> = {
      TODO: 'IN_PROGRESS',
      IN_PROGRESS: 'DONE',
      DONE: 'TODO',
    };

    const newStatus = statusCycle[task.status];

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status: newStatus as any },
    });

    success(res, updatedTask, 'Task status toggled successfully');
  } catch (err) {
    error(res, 'Failed to toggle task status', 500, err);
  }
};
