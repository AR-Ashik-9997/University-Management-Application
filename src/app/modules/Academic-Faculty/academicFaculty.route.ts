import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { FacultyValidation } from './academicFaculty.validation';
import { FacultyController } from './academicFaculty.controller';
import auth from '../../../middleware/auth';
import { ENUM_USER_ROLE } from '../../enums/user';


const router = express.Router();

router.post(
  '/create-faculty',
  requestValidation(
    FacultyValidation.CreateFacultyZodValidationSchema
  ),
  FacultyController.createFaculty
);

router.get('/get-all',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.STUDENT,ENUM_USER_ROLE.SUPER_ADMIN), FacultyController.getAllAcademicFaculties);

router.get('/get-single/:id',FacultyController.getSingleFaculty);
router.patch('/update-faculty/:id',requestValidation(FacultyValidation.UpdateFacultyZodValidationSchema),FacultyController.updateFaculty);
router.delete('/delete-faculty/:id',FacultyController.deleteFaculty);

export const FacultyRoute = router;
