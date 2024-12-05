import {z} from 'zod'
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name cannot be more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First name must start with a capital letter",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must contain only alphabetic characters",
    }),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z.string().min(1, { message: "Local guardian's address is required" }),
});

 export const studentValidationSchema = z.object({
  id: z.string().min(1, { message: "Student ID is required" }),
  user: z.string().min(1, { message: "User ID is required" }), 
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    invalid_type_error: "Gender must be 'male', 'female', or 'other'",
  }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" }), // Add regex if a specific format is required
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  emergencyContactNo: z
    .string()
    .min(1, { message: "Emergency contact number is required" }),
  bloogGroup: z.enum(
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    { invalid_type_error: "Invalid blood group" }
  ),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z
    .string()
    .min(1, { message: "Permanent address is required" }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;