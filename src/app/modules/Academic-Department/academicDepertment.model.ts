import { Schema, model } from 'mongoose';

import ApiError from '../../../eroors/apiErrorHandler';
import httpstatus from 'http-status';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepertment.interface';

const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: 'string', unique: true, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpstatus.CONFLICT,
      `${this.title} is already exists !`
    );
  }
  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
