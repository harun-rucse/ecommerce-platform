import Joi from "joi";
import { Schema, model } from "mongoose";
import { v4 as uniqueId } from "uuid";

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
      required: true,
      enum: ["Paid", "Unpaid"],
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
    paymentStatus: Joi.string().required().valid("Paid", "Unpaid").label("paymentStatus"),
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
