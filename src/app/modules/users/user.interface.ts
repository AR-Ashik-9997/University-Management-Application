import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/academicStudent.interface';
import { IFaculties } from '../Faculty/Faculty.interface';
import { IAdmin } from '../Admin/Admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId |IFaculties;
  admin?: Types.ObjectId |IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
