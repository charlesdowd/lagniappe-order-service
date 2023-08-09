import { HttpError } from '../../interfaces/Errors';
import { IOrder, Order } from '../../models';

export async function createOrder({
  customer,
  orderItems,
  poNumber,
}: IOrder): Promise<IOrder> {
  // We dont necessarily need this check, but putting it here anyway
  if (orderItems?.length < 1) {
    throw new HttpError('Empty orderItems array', {
      status: 400,
      friendlyMessage: 'Can not create an empty order',
    });
  }

  return Order.create({ customer, orderItems, poNumber });
}
