import { FunctionComponent } from 'react';
import { OrderData, Table, TableHeader } from './AdminOrderHistory.styled';
import { Order } from '../../../../store/slices/api/templateApi.generated';

const ExpandedRow: FunctionComponent<{ data: Order }> = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Item ID</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Quantity</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data?.orderItems?.map((orderItem) => (
          <tr key={orderItem.product._id}>
            <OrderData>{orderItem.product.itemId}</OrderData>
            <OrderData>{orderItem.product.description}</OrderData>
            <OrderData>{orderItem.quantity}</OrderData>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpandedRow;
