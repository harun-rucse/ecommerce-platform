import { Order } from "../models/order.model.js";

const getOneOrder = (filter) => {
  return Order.findOne(filter);
};

const createNewOrder = (payload, option = {}) => {
  const order = new Order(payload);

  return order.save(option);
};

const updateOneOrder = (filter, payload) => {
  return Order.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneOrder = (filter) => {
  return Order.findOneAndDelete(filter);
};

export { getOneOrder, createNewOrder, updateOneOrder, deleteOneOrder };
