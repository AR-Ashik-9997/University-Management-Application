import { NextFunction, Request, Response } from 'express';
import ApiError from '../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import { jwtHelper } from '../helper/jwtHelper';
import config from '../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
      }
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );
      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
