import { IOrder, Order } from '../../models';

export async function getAllOrders(): Promise<IOrder[]> {
  return Order.find().populate('customer').populate('orderItems.product');
}
