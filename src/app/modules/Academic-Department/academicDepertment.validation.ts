import { z } from 'zod';
const CreateDepartmentZodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});
const UpdateDepartmentZodValidationSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: 'title is required' }),
    })
    .optional(),
});

export const DepartmentValidation = {
  CreateDepartmentZodValidationSchema,
  UpdateDepartmentZodValidationSchema,
};
