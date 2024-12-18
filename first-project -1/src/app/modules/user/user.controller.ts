
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { HTTP_STATUS } from '../../http-status/http_status_code';
import sendResponse from '../utils/sendResponse';
// import studentValidationSchema from '../student/student.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};