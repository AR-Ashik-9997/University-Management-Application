import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  AcademicSemesterTitles,
  AcademicSemesterCodes,
  AcademicSemesterMonths,
} from './academicSemester.constant';
import ApiError from '../../../eroors/apiErrorHandler';
import httpstatus from 'http-status';

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: 'string', required: true, enum: AcademicSemesterTitles },
    year: { type: 'string', required: true },
    code: {
      type: 'string',
      required: true,
      AcademicSemesterCode: AcademicSemesterCodes,
    },
    startMonth: {
      type: 'string',
      required: true,
      enum: AcademicSemesterMonths,
    },
    endMonth: { type: 'string', required: true, enum: AcademicSemesterMonths },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpstatus.CONFLICT,
      'AcademicSemester is already exists !'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
);
