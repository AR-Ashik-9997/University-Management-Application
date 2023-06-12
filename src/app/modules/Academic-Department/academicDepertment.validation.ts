import { z } from 'zod';
const CreateDepartmentZodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});
const UpdateDepartmentZodValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const DepartmentValidation = {
  CreateDepartmentZodValidationSchema,
  UpdateDepartmentZodValidationSchema,
};
