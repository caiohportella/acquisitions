import logger from '#config/logger.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '#services/users.service.js';
import { formatValidationError } from '#utils/format.js';
import { userIdSchema, updateUserSchema } from '#validations/users.validation.js';

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    logger.error('Error in getAllUsersController', e);
    next(e);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }
    const user = await getUserById(validationResult.data.id);
    res.status(200).json(user);
  } catch (e) {
    logger.error(`Error in getUserByIdController: ${e.message}`);
    next(e);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const userIdValidation = userIdSchema.safeParse(req.params);
    if (!userIdValidation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(userIdValidation.error),
      });
    }

    const updateDataValidation = updateUserSchema.safeParse(req.body);
    if (!updateDataValidation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(updateDataValidation.error),
      });
    }

    const { id } = userIdValidation.data;
    const updates = updateDataValidation.data;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only update your own information.',
      });
    }

    if (req.user.role !== 'admin' && updates.role) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Only admins can change user roles.',
      });
    }

    const updatedUser = await updateUser(id, updates);
    res.status(200).json(updatedUser);
  } catch (e) {
    logger.error(`Error in updateUserController: ${e.message}`);
    next(e);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { id } = validationResult.data;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own account.',
      });
    }
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (e) {
    logger.error(`Error in deleteUserController: ${e.message}`);
    next(e);
  }
};
