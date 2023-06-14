import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { FacultyService } from './academicFaculty.service';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyFilterableFields } from './academicFaculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await FacultyService.createFaculty(academicFacultyData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationField);

    const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
// academic semester find by id
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrived successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllAcademicFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
