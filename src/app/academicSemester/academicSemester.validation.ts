import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './academicSemester.constant';
const CreateAcademicSemesterZodValidationSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({ required_error: 'year is required' }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});

export const academicSemesterValidation = {
  CreateAcademicSemesterZodValidationSchema,
};
