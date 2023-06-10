import { NextFunction, Request, Response } from 'express';
import { AcademicService } from './academicSemester.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../shared/pickPagination';
import { paginationField } from '../../shared/constants';
import { AcademicSemesterFilterableFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicService.createSemester(academicSemesterData);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next();
  }
);
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await AcademicService.getAllSemesters(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
// academic semester find by id
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrived successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
