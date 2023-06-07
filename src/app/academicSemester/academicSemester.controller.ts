import { NextFunction, Request, Response } from 'express';
import { AcademicService } from './academicSemester.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponseApi';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response,next:NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicService.createSemester(academicSemesterData);   
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
    next()
  }
);
export const AcademicSemesterController = { createSemester };
