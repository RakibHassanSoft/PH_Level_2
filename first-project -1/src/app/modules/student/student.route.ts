import express from 'express'
import { StudentConrollers } from './student.controller';
const router = express.Router();


router.get('/:studentId', StudentConrollers.getSingleStudent);

router.delete('/:studentId', StudentConrollers.deleteStudent);

router.get('/', StudentConrollers.getAllStudents);


export const studentRoutes = router; // router is object so do not need to return as object
