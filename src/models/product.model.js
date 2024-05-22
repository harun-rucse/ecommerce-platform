import Joi from "joi";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [process.env.DEFAULT_PRODUCT_IMAGE],
    },
  },
  {
    timestamps: true,
  }
);

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    quantity: Joi.string().required().label("Quantity"),
    price: Joi.string().required().label("Price"),
    description: Joi.string().label("Description"),
    rating: Joi.string().label("Rating"),
    category: Joi.string().required().label("CategoryId"),
    images: Joi.array().label("Images"),
  });

  return schema.validate(product);
};

const validateProductUpdate = (product) => {
  const schema = Joi.object({
    name: Joi.string().label("Name"),
    quantity: Joi.string().label("Quantity"),
    price: Joi.string().label("Price"),
    description: Joi.string().label("Description"),
    rating: Joi.string().label("Rating"),
    category: Joi.string().label("CategoryId"),
    images: Joi.array().label("Images"),
  });

  return schema.validate(product);
};

const Product = model("Product", productSchema);

export { Product, validateProduct, validateProductUpdate };
