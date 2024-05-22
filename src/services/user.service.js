import { User } from "../models/user.model.js";

const getOneUser = (filter) => {
  return User.findOne(filter);
};

const createNewUser = (payload, option = {}) => {
  const user = new User(payload);

  return user.save(option);
};

const updateOneUser = (filter, payload) => {
  return User.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneUser = (filter) => {
  return User.findOneAndDelete(filter);
};

export { getOneUser, createNewUser, updateOneUser, deleteOneUser };
