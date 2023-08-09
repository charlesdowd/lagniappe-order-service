import { IProduct, Product } from '../../models';
import { BaseError } from '../../interfaces/Errors';

export async function createProduct(body: IProduct): Promise<void> {
  const { itemId, description, casePack, caseWeight, category } = body;

  // Make sure all fields are non-nullish
  const allFieldsExist = [
    itemId,
    description,
    casePack,
    caseWeight,
    category,
  ].every((val) => !!val);

  if (!allFieldsExist)
    throw new BaseError('One or more fields were null', {
      friendlyMessage: 'Need all required fields to create a new product',
    });

  // Create the new product
  await Product.create({ itemId, description, casePack, caseWeight, category });
}
