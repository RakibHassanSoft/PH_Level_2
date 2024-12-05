import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
// import Joi from 'joi'
// import studentSchema from './student.joi.validation';

//controller will handle only application logic

const getAllStudents = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    
    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
  
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
const deleteStudent = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const {studentId} = req.params;
    
    const result = StudentServices.deleteSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
export const StudentConrollers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
