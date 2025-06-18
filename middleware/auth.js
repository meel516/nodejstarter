import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { checkUser } from "../services/userService.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new CustomError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "saleem", async (err, user) => {
    if (err) {
      next(new CustomError(err.message, err.statusCode, err.details));
    }
    let results = await checkUser({
      email: user.email,
    });

    req.user = results;
    next();
  });
};
