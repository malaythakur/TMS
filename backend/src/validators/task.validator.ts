import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must not exceed 200 characters'),
  description: z.string().max(2000, 'Description must not exceed 2000 characters').optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z
    .string()
    .datetime()
    .refine((date) => new Date(date) > new Date(), {
      message: 'Due date must be in the future',
    })
    .optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskQuerySchema = z.object({
  page: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().optional().default('1').transform((val) => parseInt(val, 10)).pipe(z.number().min(1))
  ),
  limit: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().optional().default('10').transform((val) => parseInt(val, 10)).pipe(z.number().min(1).max(100))
  ),
  status: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional()
  ),
  priority: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
  ),
  search: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.string().optional()
  ),
  sortBy: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.enum(['createdAt', 'dueDate', 'priority', 'title']).default('createdAt')
  ),
  sortOrder: z.preprocess(
    (val) => (Array.isArray(val) ? val[0] : val),
    z.enum(['asc', 'desc']).default('desc')
  ),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
