import express from 'express';
import requestValidation from '../../middleware/requestValidation';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  requestValidation(
    academicSemesterValidation.CreateAcademicSemesterZodValidationSchema
  ),
  AcademicSemesterController.createSemester
);

router.get('/get-all', AcademicSemesterController.getAllSemesters);

router.get('/get-single/:id',AcademicSemesterController.getSingleSemester);
router.patch('/update-semester/:id',requestValidation(academicSemesterValidation.UpadateAcademicSemesterZodValidationSchema),AcademicSemesterController.updateSemester);
router.delete('/delete-semester/:id',AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoute = router;
