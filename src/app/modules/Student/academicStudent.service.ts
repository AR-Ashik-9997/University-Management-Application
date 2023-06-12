import { IPagination } from '../../../interfaces/pagination';
import { IGenerickResponse } from '../../../interfaces/common';
import { PaginationHelper } from '../../../helper/paginationCalculate';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilter } from './academicStudent.interface';
import { AcademicStudent } from './academicStudent.model';
import { AcademicStudentSearchableFields } from './academicStudent.constant';



const createStudent = async (
  payload: IStudent
): Promise<IStudent> => {
  const result = await AcademicStudent.create(payload);
  return result;
};

const getAllStudents = async (
  filters: IStudentFilter,
  paginationOptions: IPagination
): Promise<IGenerickResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: AcademicStudentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.paginationCalculate(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const WhereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicStudent.find(WhereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicStudent.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (
  id: string
): Promise<IStudent | null> => {
  const result = await AcademicStudent.findById(id);
  return result;
};
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await AcademicStudent.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteStudent = async (
  id: string
): Promise<IStudent | null> => {
  const result = await AcademicStudent.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};