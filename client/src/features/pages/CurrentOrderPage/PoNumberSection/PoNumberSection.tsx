import { FunctionComponent, useState } from 'react';
import { PoInput, Root, Text } from './PoNumberSection.styled';
import { AddToCartButton } from '../../../../components/ProductRow/ProductRow.styled';
import { OrderItem } from '../../../../store/slices/api/templateApi.generated';
import {
  selectPoNumber,
  setPoNumber,
} from '../../../../store/slices/orderSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

interface PoNumberSectionProps {
  currentOrder: [OrderItem];
}

const PoNumberSection: FunctionComponent<PoNumberSectionProps> = ({
  currentOrder,
}) => {
  const poNumber = useAppSelector(selectPoNumber);
  const [poNum, setPoNum] = useState<string>(poNumber);

  const dispatch = useAppDispatch();

  const setPo = () => {
    dispatch(setPoNumber({ poNumber: poNum }));
  };

  const removePo = () => {
    setPoNum('');
    dispatch(setPoNumber({ poNumber: null }));
  };

  const emptyOrder = !currentOrder || currentOrder.length < 1;

  if (emptyOrder) return;

  if (!poNumber)
    return (
      <Root>
        <div className='mb-2'>
          <Text>
            Do you want to attach a PO Number to your order? *OPTIONAL*
          </Text>
        </div>
        <div>
          <PoInput
            className='mr-2'
            value={poNum}
            onChange={(e) => setPoNum(e.target.value)}
          />
          <AddToCartButton onClick={setPo} className='mx-2'>
            Add PO Number
          </AddToCartButton>
        </div>
      </Root>
    );

  return (
    <Root>
      <div className='mb-2'>
        <Text>Attached PO Number: {poNum}</Text>
      </div>
      <div>
        <AddToCartButton onClick={removePo}>Edit PO Number</AddToCartButton>
      </div>
    </Root>
  );
};

export default PoNumberSection;
