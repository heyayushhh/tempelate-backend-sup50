import { Request, Response } from 'express';
import * as productService from './products.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiSuccessResponse } from '../../utils/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import logger from '../../logger';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  logger.info('Entering getAllProducts controller');
  const products = await productService.getAllProducts();
  logger.info('Exiting getAllProducts controller');
  res
    .status(StatusCodes.OK)
    .json(new ApiSuccessResponse('Products fetched successfully', products));
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  logger.info(`Entering getProductById controller for id: ${id}`);
  const product = await productService.getProductById(id);
  logger.info(`Exiting getProductById controller for id: ${id}`);
  res
    .status(StatusCodes.OK)
    .json(new ApiSuccessResponse('Product fetched successfully', product));
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  logger.info('Entering createProduct controller');
  const product = await productService.createProduct(req.body);
  logger.info('Exiting createProduct controller');
  res
    .status(StatusCodes.CREATED)
    .json(new ApiSuccessResponse('Product created successfully', product));
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  logger.info(`Entering updateProduct controller for id: ${id}`);
  const product = await productService.updateProduct(id, req.body);
  logger.info(`Exiting updateProduct controller for id: ${id}`);
  res
    .status(StatusCodes.OK)
    .json(new ApiSuccessResponse('Product updated successfully', product));
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  logger.info(`Entering deleteProduct controller for id: ${id}`);
  const product = await productService.deleteProduct(id);
  logger.info(`Exiting deleteProduct controller for id: ${id}`);
  res
    .status(StatusCodes.OK)
    .json(new ApiSuccessResponse('Product deleted successfully', product));
});
