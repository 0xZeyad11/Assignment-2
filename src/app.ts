import express from 'express';
import morgan from 'morgan';
import { tasksRouter }  from './routes/tasks.route';
import { ResponseWrapper } from './middlewares/responseWrapper.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger";

export const app = express();
app.use(express.json())
app.use(morgan("dev"))
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs),
);
app.use(ResponseWrapper);

// Routes
app.use(tasksRouter);
