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

router.get('/pagination',AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoute = router;
