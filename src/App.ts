/* eslint-disable no-unused-vars */
import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/users/user.route';
import { AcademicSemesters } from './app/academicSemester/academicSemester.route';
import globalErrorHandler from './middleware/globalErrorHandler';
const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/user/', UserRoutes);
app.use('/api/academicSemester/',AcademicSemesters);
  // global error handler
  app.use(globalErrorHandler);

export default app;
