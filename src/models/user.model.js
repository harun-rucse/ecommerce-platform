import Joi from "joi";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ "string.pattern.base": `Phone number is not valid.` })
      .required(),
    avatar: Joi.string().label("Avatar"),
  });

  return schema.validate(user);
};

const validateUserUpdate = (user) => {
  const schema = Joi.object({
    name: Joi.string().label("Name"),
    email: Joi.string().email().label("Email"),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ "string.pattern.base": `Phone number is not valid.` }),
    avatar: Joi.string().label("Avatar"),
  });

  return schema.validate(user);
};

const User = model("User", userSchema);

export { User, validateUser, validateUserUpdate };
