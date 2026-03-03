import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
// router.use('/tasks', taskRoutes); // Placeholder for task routes

export default router;
