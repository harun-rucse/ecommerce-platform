import Joi from "joi";
import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  this.image = process.env.DEFAULT_CATEGORY_IMAGE;

  next();
});

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    image: Joi.string().label("Image"),
  });

  return schema.validate(category);
};

const validateCategoryUpdate = (category) => {
  const schema = Joi.object({
    name: Joi.string().label("Name"),
    description: Joi.string().label("Description"),
    image: Joi.string().label("Image"),
  });

  return schema.validate(category);
};

const Category = model("Category", categorySchema);

export { Category, validateCategory, validateCategoryUpdate };
