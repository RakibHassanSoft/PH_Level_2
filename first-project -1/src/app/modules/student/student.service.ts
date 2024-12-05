import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async( studentData: TStudent ) =>{
      const result = await Student.create(studentData);
      return result  // static method build-in

      // const instance = new Student(studentData)
      // //self buid method
      // if( await instance.isUserExists(studentData.id)){
      //   throw new Error('user already exist')
      // }

      // const result = instance.save() //instance method build-id
      // return result;
}

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
  };
  
  const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });
    const result = await Student.aggregate([{$match:{id:id}}])
    return result;
  };
  
  const deleteSingleStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id},{isDeleted: true} );
    return result;
  };
  
export const StudentServices ={
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB
}