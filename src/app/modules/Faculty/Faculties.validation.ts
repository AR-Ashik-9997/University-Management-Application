import { z } from 'zod';
import { bloodGroup, designation, gender } from './Faculty.constant';
const UpdateFacultiesZodValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      midleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    designation: z.enum([...designation] as [string, ...string[]]).optional(),
    profileImageUrl: z.string().optional(),
  }),
});

export const FacultiesValidation = {
  UpdateFacultiesZodValidationSchema,
};
