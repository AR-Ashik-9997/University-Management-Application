import { z } from 'zod';
const CreateFacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});
const UpdateFacultyZodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});

export const FacultyValidation = {
  CreateFacultyZodValidationSchema,
  UpdateFacultyZodValidationSchema,
};
