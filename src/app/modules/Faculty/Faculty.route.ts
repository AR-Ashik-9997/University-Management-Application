import express from 'express';
import { FacultiesController } from './Faculty.controller';
import requestValidation from '../../../middleware/requestValidation';
import { FacultiesValidation } from './Faculties.validation';

const router = express.Router();

router.get('/get-all', FacultiesController.getAllFaculties);
router.get('/get-single/:id', FacultiesController.getSingleFaculties);
router.patch(
  '/update-faculties/:id',
  requestValidation(FacultiesValidation.UpdateFacultiesZodValidationSchema),
  FacultiesController.updateFaculties
);
router.delete('/delete-faculties/:id', FacultiesController.deleteFaculties);

export const FacultiesRoute = router;
