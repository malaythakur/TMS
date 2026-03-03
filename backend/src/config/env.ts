import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  ACCESS_TOKEN_EXPIRY: z.string().min(1, 'ACCESS_TOKEN_EXPIRY is required'),
  REFRESH_TOKEN_EXPIRY: z.string().min(1, 'REFRESH_TOKEN_EXPIRY is required'),
  PORT: z.string().transform(Number).pipe(z.number().positive()),
  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
