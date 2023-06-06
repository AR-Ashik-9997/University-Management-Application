import { RequestHandler } from 'express';
import { AcademicService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicService.createSemester(academicSemesterData);
    res.status(201).json({
      success: true,
      message: 'Successfully created Academic Semester',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const AcademicSemesterController = { createSemester };
