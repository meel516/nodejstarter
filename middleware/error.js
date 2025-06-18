import { ZodError } from "zod";
import CustomError from "../utils/CustomError.js";

const errorHandler = (err, req, res, next) => {
  // Use err.statusCode if it exists, otherwise default to 500
  const statusCode = err.statusCode || 500;
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.format(), // or err.errors for raw array
    });
  }
  if (err instanceof CustomError) {
    console.log(true);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Optional: Include error name and stack in development
    // ...(process.env.NODE_ENV === "development" && {
    error: err.name,
    stack: err.stack,
    // }),
  });
};

export default errorHandler;
