import { z } from 'zod';

//this is without infere
// const userSchemaJod = z.object({
//   id: z.string(),
//   password: z
//     .string()
//     .max(20, { message: 'password can not be more than 20 char' }),
//   needsPasswordChange: z.boolean().optional().default(true),
//   role: z.enum(['student', 'faculty', 'admin']),
//   status: z.enum(['in-progress', 'blocked']).default('in-progress'),
//   isDelated: z.boolean().optional().default(false),
// });

const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
 // userSchemaJod,
};
