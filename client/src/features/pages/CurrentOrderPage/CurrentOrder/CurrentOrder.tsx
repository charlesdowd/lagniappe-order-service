import { FunctionComponent } from 'react';
import { OrderItem } from '../../../../store/slices/api/templateApi.generated';
import { removeItem } from '../../../../store/slices/orderSlice';
import { RemoveDiv } from './CurrentOrder.styled';
import {
  ResponsiveTable as Root,
  TableData,
  TableHeader,
  TableRow,
} from '../../../../components/ProductTable/ProductTable.styled';
import TrashIcon from '../../../../assets/trash-icon.svg';
import { useAppDispatch } from '../../../../store/hooks';

interface CurrentOrderProps {
  currentOrder: [OrderItem];
}

const CurrentOrder: FunctionComponent<CurrentOrderProps> = ({
  currentOrder,
}) => {
  const dispatch = useAppDispatch();

  // Empty order do not display anything
  if (!(currentOrder.length > 0)) return;

  return (
    <Root className='mt-5' style={{ borderSpacing: '0' }}>
      <thead>
        <tr>
          <TableHeader>Item ID</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Case Pack</TableHeader>
          <TableHeader>Case Weight</TableHeader>
          <TableHeader>Quantity</TableHeader>
        </tr>
      </thead>
      <tbody>
        {currentOrder?.map(({ product, quantity }: OrderItem) => (
          <TableRow key={product._id}>
            <TableData>{product.itemId}</TableData>
            <TableData>{product.description}</TableData>
            <TableData>{product.casePack}</TableData>
            <TableData>{product.caseWeight}</TableData>
            <TableData>{quantity}</TableData>
            <TableData>
              <RemoveDiv
                onClick={() => dispatch(removeItem({ product: product._id }))}
              >
                <img src={TrashIcon} height={20} />
                <span>Remove Item</span>
              </RemoveDiv>
            </TableData>
          </TableRow>
        ))}
      </tbody>
    </Root>
  );
};

export default CurrentOrder;
