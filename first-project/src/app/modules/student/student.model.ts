import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';


const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim:true,
    required:[ true,"first name is required"],
    maxlength:[20,"First name can not be more than 20"],
    validate:{
      validator: function(value : string){
        const fistNameStr  = value.charAt(0).toUpperCase() + value.slice(1);
         return fistNameStr === value 
      },
      message:"{VALUE} is not in capitalized format"
    }
  },
  middleName: {
    type: String,
    trim:true,
  },
  lastName: {
    type: String,
    trim:true,
    required:[ true,"last name is required"],
    validate:{
      validator: (value: string)=> validator.isAlpha(value),
      message:"{VALUE} is not valid"
    },
    
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim:true,
    required:[ true,"Father name is required"],
  },
  fatherOccupation: {
    type: String,
    trim:true,
    required:[ true,"Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim:true,
    required:[ true,"Father contract number is required"],
  },
  motherName: {
    type: String,
    trim:true,
    required:[ true,"mother name is required"],
  },
  motherOccupation: {
    type: String,
    trim:true,
    required:[ true,"mother  Occupation is required"],
  },
  motherContactNo: {
    type: String,  
    trim:true,
    required:[ true,"mother contract number is required"],
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    trim:true,
    required:[ true,"Name is required"],
  },
  occupation: {
    type: String,
    trim:true,
    required:[ true,"Occupation is required"],
  },
  contactNo: {
    type: String,
    trim:true,
    required:[ true,"Contract number is required"],
  },
  address: {
    type: String,
    trim:true,
    required:[ true,"Address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { 
    type: String ,
    trim:true,
    required:[true,"Id must be unique"],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required:[ true,"first name,last name is required"],
  },
  gender:{
    type:String,
    trim:true,
    enum:{
      values: ['male','femail','other'],
      message:"{VALUE} is not valid"
    },
    required:true,
  },
  dateOfBirth: { 
    type: String,
    trim:true,
   },
  email: { 
    type: String, 
    trim:true,
    unique:true,
    required:[ true,"email is required"], 
    validate:{
      validator: (value: string)=> validator.isEmail(value),
      message:"{VALUE} is not valid email"
    },
  },
  contactNo: { 
    type: String, 
    trim:true,
    required:[ true,"contract number is required"], 
  },
  emergencyContactNo: { 
    type: String, 
    trim:true,
    required:[ true,"emergency contract number is required"],
  },
  bloogGroup:{
    type:String,
    trim:true,
    enum:{
      values:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:"blog group shoud be given"
    },
  },
  presentAddress: { 
    type: String,   
    trim:true,
    required:[ true,"present address is required"],
  },
  permanentAddres: { 
    type: String,
    trim:true,
    required:[ true,"permanent address is required"],
  },
  guardian: {
    type:guardianSchema,
    required:[ true,"guarden is required"],
  },
  localGuardian: {
    type: localGuradianSchema,
    required:[ true,"local Guradian is required"],
  },
  profileImg: { 
    type: String,

   },
  isActive: {
    type:String,
    trim:true,
    enum:['active', 'blocked'],
    default:'active'
  },
});

export const StudentModel = model<Student>('Student', studentSchema);