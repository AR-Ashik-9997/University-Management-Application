import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../eroors/apiErrorHandler';
import { AcademicSemester } from '../Academic-Semester/academicSemester.model';
import { IStudent } from '../Student/academicStudent.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils';

import httpStatus from 'http-status';
import { IFaculties } from '../Faculty/Faculty.interface';
import { AcademicStudent } from '../Student/academicStudent.model';
import { FacultiesModel } from '../Faculty/Faculty.model';
import { IAdmin } from '../Admin/Admin.interface';
import { Admin } from '../Admin/Admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_Password as string;
  }
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newAllUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generatedStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await AcademicStudent.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newAllUser = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newAllUser) {
    newAllUser = await User.findOne({ id: newAllUser.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newAllUser;
};

const createFaculty = async (
  faculty: IFaculties,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_Password as string;
  }
  user.role = 'faculty';

  let newAllFacultyUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generatedFacultyId();
    user.id = id;
    faculty.id = id;
    const newFacultyUser = await FacultiesModel.create([faculty], {
      session,
    });

    if (!newFacultyUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create Faculty user'
      );
    }
    user.faculty = newFacultyUser[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newAllFacultyUser = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newAllFacultyUser) {
    newAllFacultyUser = await User.findOne({
      id: newAllFacultyUser.id,
    }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newAllFacultyUser;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
 
  if (!user.password) {
    user.password = config.default_admin_Password as string;
  }
  user.role='admin';
  let newAllAdminUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const newAdminUser = await Admin.create([admin], {
      session,
    });

    if (!newAdminUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin user');
    }
    user.admin = newAdminUser[0]._id;

    const newUser = await User.create([admin], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newAllAdminUser = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newAllAdminUser) {
    newAllAdminUser = await User.findOne({
      id: newAllAdminUser.id,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newAllAdminUser;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
