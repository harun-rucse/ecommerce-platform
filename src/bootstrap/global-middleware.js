import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const globalMiddleware = (app) => {
  // Enable CORS request
  app.use(cors(corsOptions));

  // Set security HTTP headers
  app.use(helmet());

  //Development Logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Limit request with same API
  const limiter = rateLimit({
    max: 10,
    windowMs: 60 * 1000, //Its allowed 10 request from same IP with 1 minute
    message: "To many requests with this IP, Please try in an hour!",
  });
  app.use("/api", limiter);

  // Body parser, reading data from body
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Data sanitization against NOSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter polution
  app.use(hpp());

  // Compression
  app.use(compression());
};

export default globalMiddleware;
