import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Join from 'joi'
//controller will handle only application logic
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        message: "Something went wring",
        error: err
    })
  }
};
const getAllStudents = async (req: Request, res: Response) => {
    try {
      const result = await StudentServices.getAllStudentsFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Students are retrieved succesfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wring",
        error: err
    })
    }
  };
  
  const getSingleStudent = async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
  
      const result = await StudentServices.getSingleStudentFromDB(studentId);
  
      res.status(200).json({
        success: true,
        message: 'Student is retrieved succesfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wring",
        error: err
    })
    }
  };
export const StudentConrollers = {
  createStudent,
  getAllStudents,
  getSingleStudent
};
