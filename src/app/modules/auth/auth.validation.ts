import { z } from 'zod';

const loginZodValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const RefreshTokenZodValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token  is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodValidationSchema,
  RefreshTokenZodValidation,
};
