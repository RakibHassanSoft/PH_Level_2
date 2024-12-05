import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  if (!studentData) {
    throw new Error('Student data is required');
  }

  try {
    // Create a user object
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_pass as string);
    
    userData.role = 'student';
    userData.id = '203000001'; // Manually generated ID

    // Create the user model
    const newUser = await User.create(userData);
    
    // If user is created successfully, create the student
    if (newUser && newUser._id) {
      studentData.id = newUser.id;
      studentData.user = newUser._id; // Reference the user ID

      const newStudent = await Student.create(studentData);
      return newStudent;
    } else {
      throw new Error('User creation failed');
    }
  } catch (err) {
    console.error( err);
    throw err; 
  }
};
export const UserServices = {
  createStudentIntoDB,
};
