import express from "express";
import * as controller from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(controller.createNewOrder).get(controller.getAllOrders);

router.route("/:id").get(controller.getOneOrder).patch(controller.updateOneOrder);

export default router;
