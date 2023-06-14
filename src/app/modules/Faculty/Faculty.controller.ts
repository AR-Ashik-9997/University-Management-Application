import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { IFaculties } from './Faculty.interface';
import { FacultiesFilterableFields } from './Faculty.constant';
import { FacultiesService } from './Faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, FacultiesFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await FacultiesService.getAllFaculties(
    filters,
    paginationOptions
  );
  sendResponse<IFaculties[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculties = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultiesService.getSingleFaculty(id);
  sendResponse<IFaculties>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrived successfully',
    data: result,
  });
});
const updateFaculties = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultiesService.updateFaculties(id, updatedData);
  sendResponse<IFaculties>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties updated successfully',
    data: result,
  });
});
const deleteFaculties = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultiesService.deleteFaculties(id);
  sendResponse<IFaculties>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties deleted successfully',
    data: result,
  });
});

export const FacultiesController = {
  getAllFaculties,
  getSingleFaculties,
  updateFaculties,
  deleteFaculties,
};
