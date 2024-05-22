import { Product } from "../models/product.model.js";

const getOneProduct = (filter) => {
  return Product.findOne(filter);
};

const createNewProduct = (payload, option = {}) => {
  const product = new Product(payload);

  return product.save(option);
};

const updateOneProduct = (filter, payload) => {
  return Product.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneProduct = (filter) => {
  return Product.findOneAndDelete(filter);
};

export { getOneProduct, createNewProduct, updateOneProduct, deleteOneProduct };
