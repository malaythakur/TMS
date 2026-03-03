import { Response } from 'express';

export const success = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const error = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: unknown
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { error: errors }),
  });
};
