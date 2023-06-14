import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { StudentValidation } from './academicStudent.validation';
import { StudentController } from './academicStudent.controller';


const router = express.Router();

router.get('/get-all', StudentController.getAllStudents);
router.get('/get-single/:id',StudentController.getSingleStudent);
router.patch('/update-Student/:id',requestValidation(StudentValidation.UpdateStudentZodValidationSchema),StudentController.updateStudent);
router.delete('/delete-Student/:id',StudentController.deleteStudent);

export const StudentRoute = router;
