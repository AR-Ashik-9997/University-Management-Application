import  { Secret } from 'jsonwebtoken';
/* eslint-disable no-unsafe-optional-chaining */
import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';
import { User } from '../users/user.model';
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;
  const user = new User();
  const isExistUser = await user.isExistUser(id);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (
    isExistUser?.password &&
    !user.isPasswordMatched(password, isExistUser?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isExistUser;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const RefreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verified = null;
  try {
    verified = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }
  const { userId } = verified;
  const user = new User();
  const isExistUser = await user.isExistUser(userId);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  const { id, role } = isExistUser;
  const newAccessToken = jwtHelper.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  RefreshToken,
};
