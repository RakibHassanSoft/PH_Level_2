import express from 'express'
import { StudentConrollers } from './student.controller';
const router = express.Router();

router.post('/create-student',StudentConrollers.createStudent);

export const studentRoutes = router; // router is object so do not need to return as object
