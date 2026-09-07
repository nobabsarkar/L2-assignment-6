import z from "zod";

const UserRegistrationZodSchema = z.object({
  name: z
    .string("Not A String!!!")
    .min(3, "Name must be atleast 3 characters")
    .max(10),
  email: z.email("Not email"),
  password: z
    .string()
    .min(6, "Password Must Minimum 6 Characters")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain atleast 1 Special Characters",
    ),
});

const UserEmailVerifyZodSchema = z.object({
  email: z.email("Not email"),
  otp: z.string().length(6),
});

const LoginZodSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain atleast 1 Special Characters",
    ),
});

const ForgotPasswordZodSchema = z.object({
  email: z.email(),
});

const ResetPasswordZodSchema = z.object({
  email: z.email(),
  newPassword: z
    .string()
    .min(8, "Password Must Minimum 8 Characters")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain atleast 1 Special Characters",
    ),
  otp: z.string().length(6),
});

export const UserValidation = {
  UserRegistrationZodSchema,
  UserEmailVerifyZodSchema,
  LoginZodSchema,
  ForgotPasswordZodSchema,
  ResetPasswordZodSchema,
};
