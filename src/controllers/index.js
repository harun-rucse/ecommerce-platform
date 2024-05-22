import * as redisClient from "../bootstrap/redis-client.js";
import catchAsync from "../utils/catch-async.js";

/**
 * @desc    Get total traffic
 * @route   GET /api/get-total-traffic
 * @access  Public
 */
const getTotalTraffic = catchAsync(async (req, res, next) => {
  const totalTraffic = await redisClient.getAsync(process.env.REDIS_KEY);
  res.status(200).send(totalTraffic || "0");
});

export { getTotalTraffic };
