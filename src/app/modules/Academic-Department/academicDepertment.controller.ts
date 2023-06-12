import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { AcademicDepartmentFilterableFields } from './academicDepertment.constant';
import { DepartmentService } from './academicDepertment.service';
import { IAcademicDepartment } from './academicDepertment.interface';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await DepartmentService.createDepartment(academicDepartmentData);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});
const getAllDeparments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await DepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
// academic semester find by id
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DepartmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrived successfully',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await DepartmentService.updateDepartment(id, updatedData);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DepartmentService.deleteDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDeparments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
