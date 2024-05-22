import _ from "lodash";
import mongoose from "mongoose";
import { validateOrder, validateOrderUpdate } from "../models/order.model.js";
import * as orderService from "../services/order.service.js";

import catchAsync from "../utils/catch-async.js";
import AppError from "../utils/app-error.js";
import ApiResponse from "../utils/api-response.js";

/**
 * @desc    Create a new order
 * @route   GET /api/orders
 * @access  Public
 */
const createNewOrder = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error } = validateOrder(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const payload = _.pick(req.body, ["user", "products", "deliveryAddress", "paymentMethod", "paymentStatus"]);
    const newOrder = await orderService.createNewOrder(payload, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(new ApiResponse(201, newOrder, "Order created successfully"));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    next(err);
  }
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Public
 */
const getAllOrders = catchAsync(async (req, res, next) => {
  const allOrders = await orderService.getAllOrders();

  res.status(200).json(new ApiResponse(200, allOrders));
});

/**
 * @desc    Get single orders
 * @route   GET /api/orders/id
 * @access  Public
 */
const getOneOrder = catchAsync(async (req, res, next) => {
  const order = await orderService.getOneOrder({ _id: req.params.id });
  if (!order) return next(new AppError("No order found with this id.", 404));

  res.status(200).json(new ApiResponse(200, order));
});

/**
 * @desc    Update single orders
 * @route   PATCH /api/orders/id
 * @access  Public
 */
const updateOneOrder = catchAsync(async (req, res, next) => {
  const { error } = validateOrderUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ["orderStatus", "paymentStatus"]);

  const updateOrder = await orderService.updateOneOrder({ _id: req.params.id }, payload);
  if (!updateOrder) return next(new AppError("No order found with this id.", 404));

  res.status(200).json(new ApiResponse(200, updateOrder, "Order updated successfully"));
});

export { getAllOrders, createNewOrder, getOneOrder, updateOneOrder };
