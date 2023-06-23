import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import pick from '../../../shared/pickPagination';
import { paginationField } from '../../../shared/constants';
import { AdminsFilterableFields } from './Admin.constant';
import { IAdmin } from './Admin.interface';
import { AdminService } from './Admin.service';


const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminsFilterableFields);
  const paginationOptions = pick(req.query, paginationField);

  const result = await AdminService.getAllAdmins(
    filters,
    paginationOptions
  );
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Admins retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmins = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Admins retrived successfully',
    data: result,
  });
});
const updateAdmins = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateAdmins(id, updatedData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Admins updated successfully',
    data: result,
  });
});
const deleteAdmins = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmins(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Admins deleted successfully',
    data: result,
  });
});

export const AdminsController = {
  getAllAdmins,
  getSingleAdmins,
  updateAdmins,
  deleteAdmins,
};
