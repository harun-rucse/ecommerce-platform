import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";
import * as redisClient from "../bootstrap/redis-client.js";
import logger from "../logger/index.js";

const checkAPIKey = catchAsync(async (req, _, next) => {
  const apiKey = req.header("api-key");
  if (!apiKey) return next(new AppError("API key is required!", 400));

  next();
});

const countTraffic = async (_, __, next) => {
  try {
    await redisClient.incrAsync(process.env.REDIS_KEY);
  } catch (err) {
    logger.error("Error incrementing total-traffic in Redis:");
  }
  next();
};

export { checkAPIKey, countTraffic };
