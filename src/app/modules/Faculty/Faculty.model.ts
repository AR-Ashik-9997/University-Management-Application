import { Schema, model } from 'mongoose';
import { IFaculties, IFacultiesModel } from './Faculty.interface';
import { bloodGroup, designation, gender } from './Faculty.constant';

const FacultiesSchema = new Schema<IFaculties, IFacultiesModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      required: true,
      type: {
        firstName: { type: String, required: true },
        midleName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    gender: {
      type: String,
      enum: gender,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    designation: { type: String, enum: designation },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    profileImageUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const FacultiesModel = model<IFaculties, IFacultiesModel>(
  'Faculty',
  FacultiesSchema
);
