import { Model } from 'mongoose';

export type IAcademicDepatment = {
  title: string;  
};

export type AcademicDepartmentModel = Model<IAcademicDepatment>;
export type AcademicDepartmentsearchFields = {
  searchTerm?: string;
};
