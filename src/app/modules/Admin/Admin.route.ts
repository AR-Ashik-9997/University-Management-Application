import express from 'express';

import requestValidation from '../../../middleware/requestValidation';
import { AdminsController } from './Admin.controller';
import { AdminsValidation } from './Admin.validation';

const router = express.Router();

router.get('/get-all', AdminsController.getAllAdmins);
router.get('/get-single/:id', AdminsController.getSingleAdmins);
router.patch(
  '/update-faculties/:id',
  requestValidation(AdminsValidation.UpdateAdminsZodValidationSchema),
  AdminsController.updateAdmins
);
router.delete('/delete-faculties/:id', AdminsController.deleteAdmins);

export const AdminsRoute = router;
