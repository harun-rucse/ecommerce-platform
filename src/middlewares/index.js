import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";

const checkAPIKey = catchAsync(async (req, _, next) => {
  const apiKey = req.header("api-key");
  if (!apiKey) return next(new AppError("API key is required!", 400));

  next();
});

export { checkAPIKey };
