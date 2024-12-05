import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .pattern(/^[A-Z][a-zA-Z]*$/, 'Capitalized format')
      .messages({
        'string.pattern.base': '"{#value}" is not in capitalized format',
        'any.required': 'First name is required',
        'string.max': 'First name cannot be more than 20 characters',
      }),
    middleName: Joi.string().trim().optional(),
    lastName: Joi.string()
      .trim()
      .required()
      .pattern(/^[a-zA-Z]+$/, 'Alphabet only')
      .messages({
        'string.pattern.base': '"{#value}" is not valid',
        'any.required': 'Last name is required',
      }),
  });
  const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required().messages({
      'any.required': 'Father name is required',
    }),
    fatherOccupation: Joi.string().trim().required().messages({
      'any.required': 'Father occupation is required',
    }),
    fatherContactNo: Joi.string().trim().required().messages({
      'any.required': 'Father contact number is required',
    }),
    motherName: Joi.string().trim().required().messages({
      'any.required': 'Mother name is required',
    }),
    motherOccupation: Joi.string().trim().required().messages({
      'any.required': 'Mother occupation is required',
    }),
    motherContactNo: Joi.string().trim().required().messages({
      'any.required': 'Mother contact number is required',
    }),
  });
  const localGuardianSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      'any.required': 'Name is required',
    }),
    occupation: Joi.string().trim().required().messages({
      'any.required': 'Occupation is required',
    }),
    contactNo: Joi.string().trim().required().messages({
      'any.required': 'Contact number is required',
    }),
    address: Joi.string().trim().required().messages({
      'any.required': 'Address is required',
    }),
  });
  const studentSchema = Joi.object({
    id: Joi.string().trim().required().messages({
      'any.required': 'ID is required',
    }),
    name: userNameSchema.required().messages({
      'any.required': 'Name is required',
    }),
    gender: Joi.string()
      .trim()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': '{#value} is not valid',
        'any.required': 'Gender is required',
      }),
    dateOfBirth: Joi.string().trim().optional(),
    email: Joi.string()
      .trim()
      .email()
      .required()
      .messages({
        'string.email': '"{#value}" is not a valid email',
        'any.required': 'Email is required',
      }),
    contactNo: Joi.string().trim().required().messages({
      'any.required': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().trim().required().messages({
      'any.required': 'Emergency contact number is required',
    }),
    bloogGroup: Joi.string()
      .trim()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional()
      .messages({
        'any.only': 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
      }),
    presentAddress: Joi.string().trim().required().messages({
      'any.required': 'Present address is required',
    }),
    permanentAddres: Joi.string().trim().required().messages({
      'any.required': 'Permanent address is required',
    }),
    guardian: guardianSchema.required().messages({
      'any.required': 'Guardian is required',
    }),
    localGuardian: localGuardianSchema.required().messages({
      'any.required': 'Local guardian is required',
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
      .trim()
      .valid('active', 'blocked')
      .default('active')
      .messages({
        'any.only': '{#value} must be active or blocked',
      }),
  });
  
export default studentSchema