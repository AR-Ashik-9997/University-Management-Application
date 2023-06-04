import { IGenerickErrorMessage } from './error';
export type IGenerickErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenerickErrorMessage[];
};
