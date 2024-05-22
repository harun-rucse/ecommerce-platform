import express from "express";
import * as controller from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/", controller.getAllInventories);
router.patch("/:id/add-quantity", controller.updateOneInventory);

router.route("/:id").get(controller.getOneInventory).delete(controller.deleteOneInventory);

export default router;
