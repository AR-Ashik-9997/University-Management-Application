import express from 'express';
import { UserController } from './user.controller';
import requestValidation from '../../../middleware/requestValidation';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  requestValidation(UserValidation.createUserzodValidationSchema),
  UserController.createStudent
);
router.post(
  '/create-faculties',
  requestValidation(UserValidation.createFacultyUserzodValidationSchema),
  UserController.createFaculty
);

export const UserRoutes = router;
