import { Schema, model } from 'mongoose';

import ApiError from '../../../eroors/apiErrorHandler';
import httpstatus from 'http-status';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const AcademicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: 'string', unique: true, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AcademicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpstatus.CONFLICT,
      `${this.title} Faculty is already exists !`
    );
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
