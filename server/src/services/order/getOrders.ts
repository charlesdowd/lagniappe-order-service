import { IOrderDocument, Order } from '../../models';

export async function getOrders(userId: string): Promise<IOrderDocument[]> {
  return Order.find({ customer: userId })
    .populate('customer') // Populate the customer property with the full user
    .populate({
      path: 'orderItems', // Populate each product inside the orderItems array
      populate: {
        path: 'product',
        model: 'Product',
      },
    });
}
