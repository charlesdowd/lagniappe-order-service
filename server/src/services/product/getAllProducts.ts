import { Product, IProductDocument } from '../../models';
import { BaseError } from '../../interfaces/Errors';

export async function getAllProducts(): Promise<IProductDocument[]> {
  try {
    return await Product.find();
  } catch (error) {
    console.log(error);
    throw new BaseError('Error getting Products');
  }
}
