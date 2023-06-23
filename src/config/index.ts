import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  default_student_Password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_Password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_Password: process.env.DEFAULT_ADMIN_PASSWORD,
};
