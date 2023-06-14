import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { FacultyValidation } from './academicFaculty.validation';
import { FacultyController } from './academicFaculty.controller';


const router = express.Router();

router.post(
  '/create-faculty',
  requestValidation(
    FacultyValidation.CreateFacultyZodValidationSchema
  ),
  FacultyController.createFaculty
);

router.get('/get-all', FacultyController.getAllAcademicFaculties);

router.get('/get-single/:id',FacultyController.getSingleFaculty);
router.patch('/update-faculty/:id',requestValidation(FacultyValidation.UpdateFacultyZodValidationSchema),FacultyController.updateFaculty);
router.delete('/delete-faculty/:id',FacultyController.deleteFaculty);

export const FacultyRoute = router;
