import { Request, Response, NextFunction } from 'express'
import { IGenerickErrorMessage } from '../interfaces/error'
import config from '../config'
import handleValidationError from '../eroors/handleValidationError'
import { error } from 'winston'
import ApiError from '../eroors/apiErrorHandler'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenerickErrorMessage[] = []
  if (err?.name === 'validationError') {
    const simplifiedErrorMessage = handleValidationError(err)
    statusCode = simplifiedErrorMessage.statusCode
    message = simplifiedErrorMessage.message
    errorMessage = simplifiedErrorMessage.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
