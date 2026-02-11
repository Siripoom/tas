import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error";
import { logger } from "../lib/logger";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      code: "400_VALIDATION_ERROR",
      message: "Validation failed",
      details: error.flatten(),
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
    });
  }

  logger.error({ err: error }, "Unhandled error");
  return res.status(500).json({
    code: "500_INTERNAL_ERROR",
    message: "Internal server error",
  });
}
