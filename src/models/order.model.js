import Joi from "joi";
import { Schema, model } from "mongoose";
import { v4 as uniqueId } from "uuid";
import * as productService from "../services/product.service.js";
import * as inventoryService from "../services/inventory.service.js";
import AppError from "../utils/app-error.js";

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
    },
    deliveryAddress: {
      type: addressSchema,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Completed", "Cancelled"],
      default: "Placed",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.orderId = uniqueId();

  next();
});

orderSchema.pre("save", async function (next) {
  const order = this;
  let totalAmount = 0;

  try {
    // First, check all products for availability
    await Promise.all(
      order.products.map(async (item) => {
        const productDetails = await productService.getOneProduct({ _id: item.product });
        if (!productDetails) throw new AppError("Product not found", 404);

        // Check available quantity in the inventory
        const inventory = await inventoryService.getOneInventory({ product: productDetails._id });
        if (!inventory || inventory.quantity < item.quantity) {
          throw new AppError("Product quantity not available", 400);
        }

        const price = item.quantity * productDetails.price;
        item.price = price;
        totalAmount += price;
      })
    );

    // If all checks pass, update the inventories
    await Promise.all(
      order.products.map(async (item) => {
        const inventory = await inventoryService.getOneInventory({ product: item.product });
        inventory.quantity -= item.quantity;
        await inventory.save();
      })
    );

    order.totalAmount = totalAmount;
    next();
  } catch (error) {
    next(error);
  }
});

orderSchema.pre(/^find/, function (next) {
  this.populate("user", "name email phone").populate("products.product", "name price category images");

  next();
});

const validateOrder = (order) => {
  const schema = Joi.object({
    user: Joi.string().required().label("UserId"),
    products: Joi.array().items(
      Joi.object({
        product: Joi.string().required().label("ProductId"),
        quantity: Joi.number().integer().min(1).required().label("Quantity"),
      })
        .required()
        .min(1)
    ),
    deliveryAddress: Joi.object({
      street: Joi.string().required().label("Street"),
      city: Joi.string().required().label("City"),
      postalCode: Joi.string().required().label("PostalCode"),
    }),
    paymentMethod: Joi.string().valid("COD", "CARD").label("PaymentMethod"),
    paymentStatus: Joi.string().valid("Paid", "Unpaid").label("paymentStatus"),
  });

  return schema.validate(order);
};

const validateOrderUpdate = (order) => {
  const schema = Joi.object({
    orderStatus: Joi.string().valid("Placed", "Completed", "Cancelled").label("OrderStatus"),
    paymentStatus: Joi.string().valid("Paid", "Unpaid").label("paymentStatus"),
  });

  return schema.validate(order);
};

const Order = model("Order", orderSchema);

export { Order, validateOrder, validateOrderUpdate };
