import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { DepartmentValidation } from './academicDepertment.validation';
import { DepartmentController } from './academicDepertment.controller';

const router = express.Router();

router.post(
  '/create-department',
  requestValidation(
    DepartmentValidation.CreateDepartmentZodValidationSchema
  ),
  DepartmentController.createDepartment
);

router.get('/get-all', DepartmentController.getAllDeparments);

router.get('/get-single/:id',DepartmentController.getSingleDepartment);
router.patch('/update-department/:id',requestValidation(DepartmentValidation.UpdateDepartmentZodValidationSchema),DepartmentController.updateDepartment);
router.delete('/delete-department/:id',DepartmentController.deleteDepartment);

export const DepartmentRoute = router;
