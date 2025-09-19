import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '#controllers/users.controller.js';
import { authenticateToken, requireRole } from '#middleware/auth.middleware.js';

const router = Router();

router
  .route('/')
  .get(authenticateToken, requireRole(['admin']), getAllUsersController);

router
  .route('/:id')
  .get(authenticateToken, getUserByIdController)
  .put(authenticateToken, updateUserController)
  .delete(authenticateToken, deleteUserController);

export default router;
