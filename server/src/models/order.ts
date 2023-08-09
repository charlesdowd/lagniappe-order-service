import { Schema, Document, model, ObjectId, Types } from 'mongoose';
import { IProduct } from './product';

const { ObjectId } = Types;

// Type to represent part of an order. Individual product and quantity ordered
export type OrderItem = {
  product: IProduct;
  quantity: number;
};

// An order placed by a customer with the list of what products and how many of each product was requested
export interface IOrder {
  customer: ObjectId;
  orderItems: [OrderItem];
  poNumber?: string;
}

export interface IOrderDocument extends IOrder, Document {}

const orderSchema = new Schema(
  {
    customer: { type: ObjectId, ref: 'User' },
    orderItems: [
      {
        /*
         * Since orderItems is a sub-document, mongoose automatically creates
         * _ids on these array elements. This line shuts it off
         */
        _id: false,
        product: { type: ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    PoNumber: { type: String, required: false },
  },
  { timestamps: true },
);

export default model<IOrder>('Order', orderSchema);
