import _ from "lodash";
import { validateCategory, validateCategoryUpdate } from "../models/category.model.js";
import * as categoryService from "../services/category.service.js";
import catchAsync from "../utils/catch-async.js";
import AppError from "../utils/app-error.js";
import ApiResponse from "../utils/api-response.js";

/**
 * @desc    Create a category
 * @route   GET /api/categories
 * @access  Private
 */
const createNewCategory = catchAsync(async (req, res, next) => {
  const { error } = validateCategory(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "description", "image"]);
  const newCategory = await categoryService.createNewCategory(payload);

  res.status(201).json(new ApiResponse(201, newCategory, "Category created successfully"));
});

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Private
 */
const getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await categoryService.getAllCategories();

  res.status(200).json(new ApiResponse(200, allCategories));
});

/**
 * @desc    Get single category
 * @route   GET /api/categories/id
 * @access  Private
 */
const getOneCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.getOneCategory({ _id: req.params.id });
  if (!category) return next(new AppError("No category found with this id.", 404));

  res.status(200).json(new ApiResponse(200, category));
});

/**
 * @desc    Update single category
 * @route   PATCH /api/categories/id
 * @access  Private
 */
const updateOneCategory = catchAsync(async (req, res, next) => {
  const { error } = validateCategoryUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "description", "image"]);

  const updateCategory = await categoryService.updateOneCategory({ _id: req.params.id }, payload);
  if (!updateCategory) return next(new AppError("No category found with this id.", 404));

  res.status(200).json(new ApiResponse(200, updateCategory, "Category updated successfully"));
});

/**
 * @desc    Delete single category
 * @route   DELETE /api/categories/id
 * @access  Private
 */
const deleteOneCategory = catchAsync(async (req, res, next) => {
  const deleteCategory = await categoryService.deleteOneCategory({ _id: req.params.id });
  if (!deleteCategory) return next(new AppError("No category found with this id.", 404));

  res.status(200).json(new ApiResponse(200, deleteCategory, "Category deleted successfully"));
});

export { getAllCategories, createNewCategory, getOneCategory, updateOneCategory, deleteOneCategory };
