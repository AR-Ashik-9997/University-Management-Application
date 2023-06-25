import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  requestValidation(AuthValidation.loginZodValidationSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  requestValidation(AuthValidation.RefreshTokenZodValidation),
  AuthController.RefreshToken
);

export const AuthRoutes = router;
