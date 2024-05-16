import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters long")
    .max(20, "Username shouldn't exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")


export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be of 6 characters"})
})