import _ from "lodash";
import { validateInventoryUpdate } from "../models/inventory.model.js";
import * as productService from "../services/product.service.js";
import * as inventoryService from "../services/inventory.service.js";
import catchAsync from "../utils/catch-async.js";
import AppError from "../utils/app-error.js";
import ApiResponse from "../utils/api-response.js";

/**
 * @desc    Get all inventories
 * @route   GET /api/inventories
 * @access  Private
 */
const getAllInventories = catchAsync(async (req, res, next) => {
  const allInventories = await inventoryService.getAllInventories();

  res.status(200).json(new ApiResponse(200, allInventories));
});

/**
 * @desc    Get single inventory
 * @route   GET /api/inventories/id
 * @access  Private
 */
const getOneInventory = catchAsync(async (req, res, next) => {
  const inventory = await inventoryService.getOneInventory({ _id: req.params.id });
  if (!inventory) return next(new AppError("No inventory found with this id.", 404));

  res.status(200).json(new ApiResponse(200, inventory));
});

/**
 * @desc    Add single inventory quantity
 * @route   PATCH /api/inventories/id/add-quantity
 * @access  Private
 */
const updateOneInventory = catchAsync(async (req, res, next) => {
  const { error } = validateInventoryUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const inventory = await inventoryService.getOneInventory({ _id: req.params.id });
  if (!inventory) return next(new AppError("No inventory found with this id.", 404));

  const payload = { quantity: parseInt(inventory.quantity) + req.body.quantity };
  const updateInventory = await inventoryService.updateOneInventory({ _id: req.params.id }, payload);

  res.status(200).json(new ApiResponse(200, updateInventory, "Inventory updated successfully"));
});

/**
 * @desc    Delete single inventory
 * @route   DELETE /api/inventories/id
 * @access  Private
 */
const deleteOneInventory = catchAsync(async (req, res, next) => {
  const deleteInventory = await inventoryService.deleteOneInventory({ _id: req.params.id });
  if (!deleteInventory) return next(new AppError("No inventory found with this id.", 404));

  await productService.deleteOneProduct({ _id: deleteInventory.product });

  res.status(200).json(new ApiResponse(200, deleteInventory, "Inventory deleted successfully"));
});

export { getAllInventories, getOneInventory, updateOneInventory, deleteOneInventory };
