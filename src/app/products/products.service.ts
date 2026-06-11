import { db } from '../../config/db.config';
import { products } from './products.schema';
import { eq } from 'drizzle-orm';
import { CreateProductDto } from './dto/post-products.routes';
import { UpdateProductDto } from './dto/put-products.routes';
import logger from '../../logger';
import { NotFoundError } from '../../utils/ApiError';

export const getAllProducts = async () => {
  logger.info('Entering getAllProducts service');
  try {
    const result = await db.select().from(products);
    logger.info('Exiting getAllProducts service');
    return result;
  } catch (error) {
    logger.error('Error in getAllProducts service', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  logger.info(`Entering getProductById service for id: ${id}`);
  try {
    const result = await db.select().from(products).where(eq(products.id, id));
    if (result.length === 0) {
      throw new NotFoundError('Product not found');
    }
    logger.info(`Exiting getProductById service for id: ${id}`);
    return result[0];
  } catch (error) {
    logger.error(`Error in getProductById service for id: ${id}`, error);
    throw error;
  }
};

export const createProduct = async (data: CreateProductDto) => {
  logger.info('Entering createProduct service');
  try {
    const result = await db.insert(products).values({
      name: data.name,
      description: data.description,
      price: data.price.toString(),
    }).returning();
    logger.info('Exiting createProduct service');
    return result[0];
  } catch (error) {
    logger.error('Error in createProduct service', error);
    throw error;
  }
};

export const updateProduct = async (id: string, data: UpdateProductDto) => {
  logger.info(`Entering updateProduct service for id: ${id}`);
  try {
    const updateData: any = { ...data };
    if (data.price) updateData.price = data.price.toString();
    
    const result = await db
      .update(products)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
      
    if (result.length === 0) {
      throw new NotFoundError('Product not found');
    }
    logger.info(`Exiting updateProduct service for id: ${id}`);
    return result[0];
  } catch (error) {
    logger.error(`Error in updateProduct service for id: ${id}`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  logger.info(`Entering deleteProduct service for id: ${id}`);
  try {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    if (result.length === 0) {
      throw new NotFoundError('Product not found');
    }
    logger.info(`Exiting deleteProduct service for id: ${id}`);
    return result[0];
  } catch (error) {
    logger.error(`Error in deleteProduct service for id: ${id}`, error);
    throw error;
  }
};
