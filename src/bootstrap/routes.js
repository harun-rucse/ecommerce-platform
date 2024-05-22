import globalErrorHandler from "../controllers/error.controller.js";
import AppError from "../utils/app-error.js";
import userRouter from "../routes/user.route.js";
import productRouter from "../routes/product.route.js";
import categoryRouter from "../routes/category.route.js";
import inventoryRouter from "../routes/inventory.route.js";
import orderRouter from "../routes/order.route.js";
import { getTotalTraffic } from "../controllers/index.js";
import { checkAPIKey, countTraffic } from "../middlewares/index.js";

const routes = (app) => {
  // Get total traffic
  app.use("/api/get-total-traffic", getTotalTraffic);

  // Check API key in the req headers
  app.use(checkAPIKey);

  // Keep tract total api request
  app.use("/api", countTraffic);

  app.use("/api/users", userRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/products", productRouter);
  app.use("/api/inventories", inventoryRouter);
  app.use("/api/orders", orderRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server.`, 404));
  });

  app.use(globalErrorHandler);
};

export default routes;
