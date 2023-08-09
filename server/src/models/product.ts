import { Schema, Document, model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/naming-convention
enum PRODUCT_CATEGORY {
  SEAFOOD_CAKES = 'SEAFOOD_CAKES',
  SEAFOOD_BURGERS = 'SEAFOOD_BURGERS',
  SEAFOOD_SAUSAGE = 'SEAFOOD_SAUSAGE',
  SEAFOOD_SALADS = 'SEAFOOD_SALADS',
  SEAFOOD_STUFFING = 'SEAFOOD_STUFFING',
  PREPARED_FILLETS = 'PREPARED_FILLETS',
}

export interface IProduct {
  itemId: string;
  description: string;
  casePack: string;
  caseWeight: string;
  category: PRODUCT_CATEGORY;
}

export interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema(
  {
    itemId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    casePack: { type: String, required: true },
    caseWeight: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(PRODUCT_CATEGORY),
      required: false,
    },
  },
  { timestamps: true },
);

export default model<IProduct>('Product', productSchema);
