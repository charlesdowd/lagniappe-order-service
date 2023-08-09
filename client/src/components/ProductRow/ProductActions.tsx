import { FunctionComponent, useRef } from 'react';
import { toast } from 'react-toastify';
import { addItem } from '../../store/slices/orderSlice';
import FavoritedIcon from '../../assets/favorited-icon.svg';
import NonFavoritedIcon from '../../assets/non-favorited-icon.svg';
import {
  ActionsRoot,
  BigButton,
  SmallButton,
  OrderInput,
  FavoriteButton,
} from './ProductRow.styled';
import { addFavorite, removeFavorite } from '../../store/slices/productSlice';
import { Product } from '../../store/slices/api/templateApi.generated';
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '../../store/slices/api/templateApi';
import { useAppDispatch } from '../../store/hooks';

interface ProductActionsProps {
  product: Product;
  favorite: boolean;
}

const ProductActions: FunctionComponent<ProductActionsProps> = ({
  product,
  favorite,
}) => {
  const [addFavoriteApi] = useAddFavoriteMutation();
  const [removeFavoriteApi] = useRemoveFavoriteMutation();

  const dispatch = useAppDispatch();

  const quantityRef = useRef<HTMLInputElement>();

  const { _id } = product;

  const toggleFavorite = () => {
    // Toggle favorite, API call and also update redux state
    if (!favorite) {
      addFavoriteApi({ body: { product: _id } });
      dispatch(addFavorite(_id));
    } else {
      removeFavoriteApi({ body: { product: _id } });
      dispatch(removeFavorite(_id));
    }
  };

  const handleSubmit = () => {
    const quantity = quantityRef.current.value;

    // Handle invalid input
    if (Number(quantity) < 1 || Number(quantity) % 1 != 0) {
      toast.error('Invalid Input');
      return;
    }

    // Add item to the users current order in redux state
    dispatch(addItem({ ...product, quantity }));
    quantityRef.current.value = null;
  };

  return (
    <ActionsRoot>
      <OrderInput type='number' ref={quantityRef} placeholder='0' />
      <BigButton onClick={handleSubmit}>Add to Order</BigButton>
      <SmallButton onClick={handleSubmit}>{' + '}</SmallButton>
      <FavoriteButton onClick={toggleFavorite}>
        <img src={favorite ? FavoritedIcon : NonFavoritedIcon} />
      </FavoriteButton>
    </ActionsRoot>
  );
};

export default ProductActions;
