import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentMethods,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUserName,
} from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'first name is required'],
    maxlength: [20, 'First name can not be more than 20'],
    validate: {
      validator: function (value: string) {
        const fistNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return fistNameStr === value;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contract number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'mother  Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'mother contract number is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contract number is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent, TStudentModel, StudentMethods>({
  id: {
    type: String,
    trim: true,
    required: [true, 'Id must be unique'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: 'User', 
  },
  name: {
    type: userNameSchema,
    required: [true, 'first name,last name is required'],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'femail', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'contract number is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'emergency contract number is required'],
  },
  bloogGroup: {
    type: String,
    trim: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'blog group shoud be given',
    },
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'present address is required'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guarden is required'],
  },
  localGuardian: {
    type: localGuradianSchema,
    required: [true, 'local Guradian is required'],
  },
  profileImg: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  //option : here we turn on the virtual 
  toJSON:{
    virtuals: true,
  }
});



//virtual add filed that is not exist in db but need to show the use like full name

studentSchema.virtual('fullName').get(function (){
  return` ${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
})



//query middlewere
studentSchema.pre('find', async function (next) {
  //this = current query
  this.find({ isDeleted: { $ne: true } });
  //console.log(this)
  next();
});
//query middlewere
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

//query middlewere
// [ {$match: {isdeleted: {$ne : true }}}  , { $match : { id : id }}]
studentSchema.pre('aggregate', async function (next) {
  // this.pipeline = [{ $match : { id : id }}]]
  this.pipeline().unshift({$match : {idDeleted: {$ne : true}}})
  next();
});

//Creating a custom instance method
studentSchema.methods.isUserExist = async function name(id: string) {
  const existingUser = await Student.findOne({ id: { $eq: id } });
  return existingUser;
};
export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
