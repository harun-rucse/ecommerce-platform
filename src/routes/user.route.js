import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(controller.createNewUser).get(controller.getAllUsers);

router.route("/:id").get(controller.getOneUser).patch(controller.updateOneUser).delete(controller.deleteOneUser);

export default router;
