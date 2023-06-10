import { NextFunction, Request, Response } from 'express';
import { AcademicService } from './academicSemester.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pickPagination from '../../shared/pickPagination';
import { paginationField } from '../../shared/constants';

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
const getAllSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pickPagination(req.query, paginationField);

    const result = await AcademicService.getAllSemesters(paginationOptions);
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrived successfully',
      meta: result.meta,
      data: result.data,
    });
    
  }
);
export const AcademicSemesterController = { createSemester, getAllSemesters };
