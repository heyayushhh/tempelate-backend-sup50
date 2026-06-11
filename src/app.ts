import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';
import logger from './logger';
import { ApiSuccessResponse } from './utils/ApiResponse';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// Register Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Health Check API
app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(
    new ApiSuccessResponse('Server is healthy', {
      uptime: process.uptime(),
      timestamp: Date.now(),
    })
  );
});

// Register Module Routers
import productRouter from './app/products/products.routes';
app.use('/api/v1/products', productRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
