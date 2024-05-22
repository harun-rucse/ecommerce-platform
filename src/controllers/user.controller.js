import _ from "lodash";
import { validateUser, validateUserUpdate } from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import catchAsync from "../utils/catch-async.js";
import AppError from "../utils/app-error.js";
import ApiResponse from "../utils/api-response.js";

/**
 * @desc    Create a user
 * @route   GET /api/users
 * @access  Public
 */
const createNewUser = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "email", "phone", "avatar"]);
  const newUser = await userService.createNewUser(payload);

  res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public
 */
const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await userService.getAllUsers();

  res.status(200).json(new ApiResponse(200, allUsers));
});

/**
 * @desc    Get single user
 * @route   GET /api/users/id
 * @access  Public
 */
const getOneUser = catchAsync(async (req, res, next) => {
  const user = await userService.getOneUser({ _id: req.params.id });
  if (!user) return next(new AppError("No user found with this id.", 404));

  res.status(200).json(new ApiResponse(200, user));
});

/**
 * @desc    Update single user
 * @route   PATCH /api/users/id
 * @access  Public
 */
const updateOneUser = catchAsync(async (req, res, next) => {
  const { error } = validateUserUpdate(req.body);

  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "email", "phone"]);

  const updateUser = await userService.updateOneUser({ _id: req.params.id }, payload);
  if (!updateUser) return next(new AppError("No user found with this id.", 404));

  res.status(200).json(new ApiResponse(200, updateUser, "User updated successfully"));
});

/**
 * @desc    Delete single user
 * @route   DELETE /api/users/id
 * @access  Public
 */
const deleteOneUser = catchAsync(async (req, res, next) => {
  const deleteUser = await userService.deleteOneUser({ _id: req.params.id });
  if (!deleteUser) return next(new AppError("No user found with this id.", 404));

  res.status(200).json(new ApiResponse(200, deleteUser, "User deleted successfully"));
});

export { getAllUsers, createNewUser, getOneUser, updateOneUser, deleteOneUser };
