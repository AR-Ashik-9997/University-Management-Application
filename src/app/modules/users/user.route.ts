import express from 'express';
import { UserController } from './user.controller';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  requestValidation(UserValidation.createStudentzodValidationSchema),
  UserController.createStudent
);
router.post(
  '/create-faculties',
  requestValidation(UserValidation.createFacultyzodValidationSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  requestValidation(UserValidation.createAdminzodValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
