import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../Academic-Department/academicDepertment.interface';
import { IAcademicFaculty } from '../Academic-Faculty/academicFaculty.interface';

export type userFaculty = {
  firstName: string;
  midleName: string;
  lastName: string;
};

export type IFaculties = {
  id: string;
  name: userFaculty;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: 'Professor' | 'Lecturer';
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  profileImageUrl?: string;
};
export type IFacultiesModel = Model<IFaculties, Record<string, unknown>>;

export type IFacultiesFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};


