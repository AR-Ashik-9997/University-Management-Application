import ApiError from '../../eroors/apiErrorHandler';
import httpstatus from 'http-status';
import {
  AcademicSemesterSearchableFields,
  AcademicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  AcademicSemesterserchFields,
  IAcademicSemester,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPagination } from '../../interfaces/pagination';
import { IGenerickResponse } from '../../interfaces/common';
import { PaginationHelper } from '../../helper/paginationCalculate';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpstatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: AcademicSemesterserchFields,
  paginationOptions: IPagination
): Promise<IGenerickResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: AcademicSemesterSearchableFields.map(field => ({
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
  const result = await AcademicSemester.find(WhereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const AcademicService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
