import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { DepartmentRoute } from '../modules/Academic-Department/academicDepertment.route';
import { AcademicSemesterRoute } from '../modules/Academic-Semester/academicSemester.route';
import { FacultyRoute } from '../modules/Academic-Faculty/academicFaculty.route';
import { StudentRoute } from '../modules/Student/academicStudent.route';
import { FacultiesRoute } from '../modules/Faculty/Faculty.route';
import { AdminsRoute } from '../modules/Admin/Admin.route';
import { ManagementDepartmentRoutes } from '../modules/ManagementDepartment/managementDepertment.route';
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
    path: '/academic-Faculty',
    route: FacultyRoute,
  },
  {
    path: '/academic-Students',
    route: StudentRoute,
  },
  {
    path: '/Faculties',
    route: FacultiesRoute,
  },
  {
    path: '/Admins',
    route: AdminsRoute,
  },
  {
    path: '/Management-departments',
    route: ManagementDepartmentRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
