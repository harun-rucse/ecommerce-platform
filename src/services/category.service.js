import { Category } from "../models/category.model.js";

const getAllCategories = (filter = {}) => {
  return Category.find(filter);
};

const getOneCategory = (filter) => {
  return Category.findOne(filter);
};

const createNewCategory = (payload, option = {}) => {
  const category = new Category(payload);

  return category.save(option);
};

const updateOneCategory = (filter, payload) => {
  return Category.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneCategory = (filter) => {
  return Category.findOneAndDelete(filter);
};

export { getAllCategories, getOneCategory, createNewCategory, updateOneCategory, deleteOneCategory };
