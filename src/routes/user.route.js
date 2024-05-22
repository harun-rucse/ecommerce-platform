import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(userController.createNewUser).get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateOneUser)
  .delete(userController.deleteOneUser);

export default router;
