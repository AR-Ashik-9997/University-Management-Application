import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { DepartmentRoute } from '../modules/Academic-Department/academicDepertment.route';
import { AcademicSemesterRoute } from '../modules/Academic-Semester/academicSemester.route';
import { FacultyRoute } from '../modules/Academic-Faculty/academicFaculty.route';
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
  {
    path: '/academic-Departments',
    route: DepartmentRoute,
  },
  {
    path: '/academic-Faculties',
    route: FacultyRoute,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
