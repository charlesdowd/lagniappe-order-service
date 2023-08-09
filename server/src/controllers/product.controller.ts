import { Request, Response } from 'express';
import { IProductDocument } from '../models';
import ProductService from '../services/product';

/**
 *
 * @param req
 * @param res
 * @returns { IProductDocument[] } all products
 */
async function getAllProducts(
  req: Request,
  res: Response<{ products: IProductDocument[] }>,
) {
  const products = await ProductService.getAllProducts();

  return res.status(200).json({ products });
}

export default {
  getAllProducts,
};
