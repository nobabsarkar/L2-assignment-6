import z from "zod";
import { catchAsync } from "../utils/catchAsync";
import type { NextFunction, Request, Response } from "express";

export const validateRequest = (zodSchema: z.ZodObject) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    let payload = req.body ?? {};

    console.log(payload, "payload");

    // 1. Parse the JSON string from Postman
    if (typeof payload.data === "string") {
      payload = JSON.parse(payload.data);
    }

    // 2. Now validate the actual JSON object
    const result = zodSchema.safeParse(payload);

    if (!result.success) {
      console.log("Validation errors:", result.error.issues);
      throw new Error(result.error.issues[0]?.message);
    }

    req.body = result.data;

    next();
  });
};
