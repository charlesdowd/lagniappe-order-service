import { NavLink } from 'react-router-dom';
import { useCreateOrderMutation } from '../../../store/slices/api/templateApi';
import {
  isApproved,
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks';
import {
  SubmitButton,
  EmptyOrderDiv,
  EmptyOrderText,
  SubmitButtonDiv,
} from './CurrentOrderPage.styled';
import EmptyOrderIcon from '../../../assets/empty-order-icon.svg';
import { OrderItem } from '../../../store/slices/api/templateApi.generated';
import { FunctionComponent } from 'react';
import { selectPoNumber, setPoNumber } from '../../../store/slices/orderSlice';

interface SubmitSectionProps {
  currentOrder: [OrderItem];
}

const SubmitSection: FunctionComponent<SubmitSectionProps> = ({
  currentOrder,
}) => {
  const dispatch = useAppDispatch();

  const approved = isApproved();
  const poNumber = useAppSelector(selectPoNumber);

  const [submitOrder, { isLoading }] = useCreateOrderMutation();

  const emptyOrder = !currentOrder || currentOrder.length < 1;

  return (
    <>
      {emptyOrder ? (
        <EmptyOrderDiv>
          <img src={EmptyOrderIcon} height={56} />
          <EmptyOrderText>
            You do not have any products in your current order. Visit the{' '}
            <NavLink to='/products'>products page</NavLink> to add to your
            current order
          </EmptyOrderText>
        </EmptyOrderDiv>
      ) : (
        <SubmitButtonDiv>
          <SubmitButton
            variant='danger'
            loading={isLoading}
            disabled={!approved}
            onClick={() => {
              submitOrder({
                body: {
                  orderItems: currentOrder,
                  poNumber,
                },
              });
              dispatch(setPoNumber({ poNumber: '' }));
            }}
          >
            Submit Order
          </SubmitButton>
        </SubmitButtonDiv>
      )}
    </>
  );
};

export default SubmitSection;
