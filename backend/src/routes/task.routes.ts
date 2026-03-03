import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';

const router = Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.get('/:id', getTask);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTask);

export default router;
