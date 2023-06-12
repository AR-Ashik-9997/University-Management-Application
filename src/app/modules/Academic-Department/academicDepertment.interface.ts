import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../Academic-Faculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string; 
  academicFaculty: Types.ObjectId | IAcademicFaculty; 
};

export type AcademicDepartmentModel = Model<IAcademicDepartment>;
export type AcademicDepartmentsearchFields = {
  searchTerm?: string;
};
