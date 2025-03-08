import { z } from "zod";
export const DoctorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z.string().min(10, "Enter phone number").max(10, "Enter phone number"),
  email: z.string().email("Invalid email address."),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  specialization: z.string().min(2, "Specialization is required."),
  type: z.enum(["FULL", "PART"], { message: "Type is required." }),
  department: z.string().min(2, "Department is required."),
  img: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
});

export const WorkingDaySchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  start_time: z.string(),
  close_time: z.string(),
});

export const WorkingDaysSchema = z.array(WorkingDaySchema).optional();
