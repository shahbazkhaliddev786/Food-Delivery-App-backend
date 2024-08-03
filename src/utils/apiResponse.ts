import { Response } from 'express';

interface ApiResponseData {
  [key: string]: any;
}

type ApiResponse = (
  res: Response,
  statusCode: number,
  status: string,
  message: string,
  data?: ApiResponseData
) => void;

export const response: ApiResponse = (res, statusCode, status, message, data) => {
  res.status(statusCode).send({
    status,
    message,
    data,
  });
};

