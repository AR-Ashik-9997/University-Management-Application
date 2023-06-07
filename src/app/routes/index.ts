import express from 'express';
import { UserRoutes } from '../users/user.route';
import { AcademicSemesterRoute } from '../academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
