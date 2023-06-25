/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/academicStudent.interface';
import { IFaculties } from '../Faculty/Faculty.interface';
import { IAdmin } from '../Admin/Admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true|false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculties;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethod = {
  isExistUser(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>,IUserMethod>;
