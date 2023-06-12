import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { StudentService } from './academicStudent.service';
import { IStudent } from './academicStudent.interface';
import { AcademicStudentFilterableFields } from './academicStudent.constant';



const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { ...academicStudentData } = req.body;
  const result = await StudentService.createStudent(academicStudentData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Student created successfully',
    data: result,
  });
});
const getAllDeparments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicStudentFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Student retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
// academic semester find by id
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Student retrived successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Student updated successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllDeparments,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
