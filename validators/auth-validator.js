const { z } = require("zod");

//creating an object schema

const loginSchema = z.object({
  email: z
  .string({ require_error: "Email is Required" })
  .trim()
  .email({ message: "Invalid email address"})
  .min(3, { message: "Email must be at least of 3 chars." })
  .max(255,{ message: "Email must not be more than 255 characters"}),

  password: z
  .string({ require_error: "Password is Required" })
  .trim()
  .min(7, { message: "Password must be at least of 6 characters" })
  .max(1024,{ message: "Name must not be more than 1024 characters"}),

})

const signupSchema = loginSchema.extend({
  username: z
    .string({ require_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 chars." })
    .max(255,{ message: "Name must not be more than 255 characters"}),

  

    phone: z
    .string({ require_error: "Phone is Required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20,{ message: "Phone must not be more than 20 characters"}),

   
    
});

module.exports = { signupSchema, loginSchema };