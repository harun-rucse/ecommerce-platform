import { Inventory } from "../models/inventory.model.js";

const getOneInventory = (filter) => {
  return Inventory.findOne(filter);
};

const createNewInventory = (payload, option = {}) => {
  const inventory = new Inventory(payload);

  return inventory.save(option);
};

const updateOneInventory = (filter, payload) => {
  return Inventory.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneInventory = (filter) => {
  return Inventory.findOneAndDelete(filter);
};

export { getOneInventory, createNewInventory, updateOneInventory, deleteOneInventory };
