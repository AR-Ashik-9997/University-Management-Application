import { Schema, model } from 'mongoose';

import ApiError from '../../../eroors/apiErrorHandler';
import httpstatus from 'http-status';
import {
  AcademicDepartmentModel,
  IAcademicDepatment,
} from './academicDepertment.interface';

const AcademicDepartmentSchema = new Schema<IAcademicDepatment>(
  {
    title: { type: 'string', unique:true, required: true },
  },
  { timestamps: true }
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpstatus.CONFLICT,
      'This Department is already exists !'
    );
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepatment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
