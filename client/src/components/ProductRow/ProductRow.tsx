import { FunctionComponent } from 'react';
import {
  TableRow as Root,
  TableData,
} from '../ProductTable/ProductTable.styled';
import { Product } from '../../store/slices/api/templateApi.generated';
import { selectFavorites } from '../../store/slices/productSlice';
import ProductActions from './ProductActions';
import { useAppSelector } from '../../store/hooks';

interface ProductRowProps {
  product: Product;
}

const ProductRow: FunctionComponent<ProductRowProps> = ({ product }) => {
  const favorites = useAppSelector(selectFavorites);

  const { itemId, description, casePack, caseWeight, _id } = product;

  const isFavorite = (_id: string) => {
    return favorites?.some((favorite) => favorite === _id);
  };

  return (
    <Root>
      <TableData>{itemId}</TableData>
      <TableData>{description}</TableData>
      <TableData>{casePack}</TableData>
      <TableData>{caseWeight}</TableData>
      <TableData>
        <ProductActions product={product} favorite={isFavorite(_id)} />
      </TableData>
    </Root>
  );
};

export default ProductRow;
