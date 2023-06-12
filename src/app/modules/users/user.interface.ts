import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/academicStudent.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
