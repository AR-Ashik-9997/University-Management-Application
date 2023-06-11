import { AcademicDepartmentSearchableFields } from './academicDepertment.constant';
import { IPagination } from '../../../interfaces/pagination';
import { IGenerickResponse } from '../../../interfaces/common';
import { PaginationHelper } from '../../../helper/paginationCalculate';
import { SortOrder } from 'mongoose';
import {
  AcademicDepartmentsearchFields,
  IAcademicDepatment,
} from './academicDepertment.interface';
import { AcademicDepartment } from './academicDepertment.model';

const createDepartment = async (
  payload: IAcademicDepatment
): Promise<IAcademicDepatment> => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartments = async (
  filters: AcademicDepartmentsearchFields,
  paginationOptions: IPagination
): Promise<IGenerickResponse<IAcademicDepatment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: AcademicDepartmentSearchableFields.map(field => ({
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
  const result = await AcademicDepartment.find(WhereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepatment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepatment>
): Promise<IAcademicDepatment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepatment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
