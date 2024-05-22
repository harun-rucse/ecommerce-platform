import Joi from "joi";
import { Schema, model } from "mongoose";

const inventorySchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const validateInventoryUpdate = (inventory) => {
  const schema = Joi.object({
    quantity: Joi.number().required().label("Quantity"),
  });

  return schema.validate(inventory);
};

const Inventory = model("Inventory", inventorySchema);

export { Inventory, validateInventoryUpdate };
