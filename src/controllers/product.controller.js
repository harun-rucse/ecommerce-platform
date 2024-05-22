import _ from "lodash";
import { validateProduct, validateProductUpdate } from "../models/product.model.js";
import * as productService from "../services/product.service.js";
import * as inventoryService from "../services/inventory.service.js";
import catchAsync from "../utils/catch-async.js";
import AppError from "../utils/app-error.js";
import ApiResponse from "../utils/api-response.js";

/**
 * @desc    Create a user
 * @route   GET /api/products
 * @access  Private
 */
const createNewProduct = catchAsync(async (req, res, next) => {
  const { error } = validateProduct(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "price", "description", "rating", "category", "images"]);
  const newProduct = await productService.createNewProduct(payload);

  const inventoryPayload = { product: newProduct._id, quantity: req.body.quantity };
  await inventoryService.createNewInventory(inventoryPayload);

  res.status(201).json(new ApiResponse(201, newProduct, "Product created successfully"));
});

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Private
 */
const getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await productService.getAllProducts();

  res.status(200).json(new ApiResponse(200, allProducts));
});

/**
 * @desc    Get single product
 * @route   GET /api/products/id
 * @access  Private
 */
const getOneProduct = catchAsync(async (req, res, next) => {
  const product = await productService.getOneProduct({ _id: req.params.id });
  if (!product) return next(new AppError("No product found with this id.", 404));

  res.status(200).json(new ApiResponse(200, product));
});

/**
 * @desc    Update single product
 * @route   PATCH /api/products/id
 * @access  Private
 */
const updateOneProduct = catchAsync(async (req, res, next) => {
  const { error } = validateProductUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["name", "price", "description", "rating", "category", "images"]);

  const updateProduct = await productService.updateOneProduct({ _id: req.params.id }, payload);
  if (!updateProduct) return next(new AppError("No product found with this id.", 404));

  res.status(200).json(new ApiResponse(200, updateProduct, "Product updated successfully"));
});

/**
 * @desc    Delete single product
 * @route   DELETE /api/products/id
 * @access  Private
 */
const deleteOneProduct = catchAsync(async (req, res, next) => {
  const deleteProduct = await productService.deleteOneProduct({ _id: req.params.id });
  if (!deleteProduct) return next(new AppError("No product found with this id.", 404));

  await inventoryService.deleteOneInventory({ product: deleteProduct._id });

  res.status(200).json(new ApiResponse(200, deleteProduct, "Product deleted successfully"));
});

export { getAllProducts, createNewProduct, getOneProduct, updateOneProduct, deleteOneProduct };
