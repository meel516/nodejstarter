import {
  checkUser,
  getUsers,
  postUser,
  getAllUsers,
  updateUser,
} from "../services/userService.js";
import jwt from "jsonwebtoken";
import { userValidation, loginValidation } from "../validations/user.js";
import CustomError from "../utils/CustomError.js";

export const postUserController = async (req, res) => {
  const { name, email, password } = req.body;
  userValidation.parse(req.body);
  let result = await postUser({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
};
export const getUserController = async (req, res) => {
  const result = await getUsers(req.user.email);
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
};
export const getAllUsersController = async (req, res) => {
  const result = await getAllUsers();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  loginValidation.parse(req.body);

  let result = await checkUser({
    email,
  });

  if (result) {
    console.log(result);
    if (result.password != password) {
      throw new CustomError("Invalid password", 400);
    }
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken: jwt.sign({ email: result.email }, "saleem"),
      },
    });
  } else {
    throw new Error("User not found");
  }
};
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  userValidation.parse(req.body);

  const result = await checkUser({
    email,
  });

  if (result) {
    throw new Error("User already exists");
  }
  const user = await postUser({
    name,
    email,
    password,
  });

  res.status(201).json({ message: "User created successfully", data: user });
};
export const UpdateUserController = async (req, res) => {
  const { profilePic, name } = req.body;
  const result = await updateUser(req.user._id, { name, profilePic });
  res.status(200).json({ message: "User updated successfully", data: result });
};
