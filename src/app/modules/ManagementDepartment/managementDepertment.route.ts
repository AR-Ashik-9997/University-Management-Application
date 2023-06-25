import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { ManagementDepartmentValidation } from './managementDepertment.validation';
import { ManagementDepartmentController } from './managementDepertment.controller';

const router = express.Router();

router.post(
  '/create-department',
  requestValidation(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/get-all', ManagementDepartmentController.getAllDepartments);
router.get(
  '/get-single/:id',
  ManagementDepartmentController.getSingleDepartment
);

router.patch(
  '/update-department/:id',
  requestValidation(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete(
  '/delete-department/:id',
  ManagementDepartmentController.deleteDepartment
);

export const ManagementDepartmentRoutes = router;
