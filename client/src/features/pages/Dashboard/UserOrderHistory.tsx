import { FunctionComponent } from 'react';
import {
  HistoryRoot,
  Title,
  EmptyHistoryDiv,
  DescriptionColumn,
} from './Dashboard.styled';
import { EmptyOrderText } from '../CurrentOrderPage/CurrentOrderPage.styled';
import EmptyOrderIcon from '../../../assets/empty-order-icon.svg';
import { useGetOrdersQuery } from '../../../store/slices/api/templateApi';
import { Order } from '../../../store/slices/api/templateApi.generated';
import { NavLink } from 'react-router-dom';
import {
  Table,
  TableData,
  TableHeader,
  TableRow,
} from '../../../components/ProductTable/ProductTable.styled';

const UserOrderHistory: FunctionComponent = () => {
  const { data } = useGetOrdersQuery();

  const orders: Order[] = data?.orders;
  if (!orders) return <div>..Loading</div>;

  if (!orders.length)
    return (
      <HistoryRoot>
        <EmptyHistoryDiv>
          <img src={EmptyOrderIcon} height={56} />
          <EmptyOrderText>
            No orders yet. Check the{' '}
            <NavLink to='/products'>products page</NavLink> and make your first
            order
          </EmptyOrderText>
        </EmptyHistoryDiv>
      </HistoryRoot>
    );

  return (
    <HistoryRoot>
      <Title>Order History</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Item ID</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader style={{ textAlign: 'center' }}>
              Order Placed
            </TableHeader>
            <TableHeader>PO #</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableData>
                <DescriptionColumn>
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.product._id}>
                      {orderItem.product.itemId}
                    </div>
                  ))}
                </DescriptionColumn>
              </TableData>
              <TableData>
                <DescriptionColumn>
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.product._id}>
                      {orderItem.product.description}
                    </div>
                  ))}
                </DescriptionColumn>
              </TableData>
              <TableData>
                <DescriptionColumn>
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.product._id}>{orderItem.quantity}</div>
                  ))}
                </DescriptionColumn>
              </TableData>
              <TableData style={{ textAlign: 'center' }}>
                {new Date(order.createdAt).toLocaleDateString('en-US')}
              </TableData>
              <TableData>{order.poNumber || 'No PO #'}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </HistoryRoot>
  );
};

export default UserOrderHistory;
