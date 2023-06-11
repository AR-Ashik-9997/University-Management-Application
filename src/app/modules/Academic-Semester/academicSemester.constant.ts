import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const AcademicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemesterSearchableFields = [  
  'title',
  'code',
  'year',
];

export const AcademicSemesterFilterableFields = ['searchTerm','title', 'code', 'year'];
