import { IPagination } from '../../../interfaces/pagination';
import { IGenerickResponse } from '../../../interfaces/common';
import { PaginationHelper } from '../../../helper/paginationCalculate';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import { IFaculties, IFacultiesFilter } from './Faculty.interface';
import { FacultiesSearchableFields } from './Faculty.constant';
import { FacultiesModel } from './Faculty.model';
import { User } from '../users/user.model';

const getAllFaculties = async (
  filters: IFacultiesFilter,
  paginationOptions: IPagination
): Promise<IGenerickResponse<IFaculties[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: FacultiesSearchableFields.map(field => ({
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
  const result = await FacultiesModel.find(WhereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await FacultiesModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculties | null> => {
  const result = await FacultiesModel.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const updateFaculties = async (
  id: string,
  payload: Partial<IFaculties>
): Promise<IFaculties | null> => {
  const isExist = await FacultiesModel.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculties not found!');
  }
  const { name, ...facultiesData } = payload;
  const updateFacultiesData: Partial<IFaculties> = { ...facultiesData };

  //name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculties>;
      (updateFacultiesData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await FacultiesModel.findOneAndUpdate({ id }, updateFacultiesData, {
    new: true,
  });

  return result;
};

const deleteFaculties = async (id: string): Promise<IFaculties | null> => {
  const isExist = await FacultiesModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await FacultiesModel.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};


export const FacultiesService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculties,
  deleteFaculties,
};
