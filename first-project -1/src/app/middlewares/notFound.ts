/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../http-status/http_status_code';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const notFound: any = (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
