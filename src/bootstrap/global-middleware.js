import express from "express";
import cors from "cors";
import morgan from "morgan";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const globalMiddleware = (app) => {
  // Enable CORS request
  app.use(cors(corsOptions));

  //Development Logging
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Body parser, reading data from body
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));
};

export default globalMiddleware;
