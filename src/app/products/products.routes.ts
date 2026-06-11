import { Router } from 'express';
import * as productController from './products.controller';
import { validate } from '../../middlewares/validate.middleware';
import { createProductSchema } from './dto/post-products.routes';
import { updateProductSchema } from './dto/put-products.routes';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validate(createProductSchema), productController.createProduct);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
