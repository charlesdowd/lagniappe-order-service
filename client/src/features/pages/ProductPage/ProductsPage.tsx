import { useState } from 'react';
import ProductRow from '../../../components/ProductRow/ProductRow';
import { Product } from '../../../store/slices/api/templateApi.generated';
import {
  Root,
  TopBar,
  Filter,
  SearchIcon,
  ContactInfo,
  EmailText,
  EmailLink,
  ButtonGroup,
  SectionButton,
  SearchBar,
  EmptyProductsContainer,
} from './ProductPage.styled';
import {
  ResponsiveTable,
  TableHeader,
} from '../../../components/ProductTable/ProductTable.styled';
import { useAppSelector } from '../../../store/hooks';
import {
  selectAllProducts,
  selectFavorites,
} from '../../../store/slices/productSlice';
import MagnifyingGlass from '../../../assets/search-icon.svg';

const ProductsPage = () => {
  // Grab all products and favorites from our store
  const allProducts = useAppSelector<Product[]>(selectAllProducts);
  const favorites = useAppSelector(selectFavorites);

  // state for selected category and current query
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [query, setQuery] = useState<string>('');

  // Helper function to determine if product is a favorite
  const isFavorite = (_id: string) => {
    return favorites?.some((fav) => fav == _id);
  };

  // Apply search query and category filters
  const selectedCategoryProducts = allProducts.filter((product) => {
    if (
      selectedCategory === 'ALL' ||
      product.category === selectedCategory ||
      (selectedCategory === 'FAVORITES' && isFavorite(product._id))
    )
      return true;
  });

  const filteredProducts = selectedCategoryProducts.filter((product) => {
    return product.description
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  // Apply favorites sort
  filteredProducts?.sort((a, b) => {
    if (isFavorite(a._id) && !isFavorite(b._id)) return -1;
    else if (!isFavorite(a._id) && isFavorite(b._id)) return 1;
    else {
      return 0;
    }
  });

  return (
    <Root>
      <TopBar>
        <SearchBar>
          <Filter
            type='search'
            placeholder='Filter by name/description of product'
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon src={MagnifyingGlass} />
        </SearchBar>

        <ContactInfo>
          <EmailText>Email Sales Rep: </EmailText>
          <EmailLink href='mailto: dylan@lagniappefoods.com'>
            dylan@lagniappefoods.com
          </EmailLink>
        </ContactInfo>
      </TopBar>

      <ButtonGroup
        type='radio'
        name='categoryFilters'
        defaultValue={'ALL'}
        onChange={(val: string) => setSelectedCategory(val)}
      >
        <SectionButton id='all' value='ALL'>
          All
        </SectionButton>
        <SectionButton id='faves' value='FAVORITES'>
          Favorites
        </SectionButton>
        <SectionButton id='cakes' value='SEAFOOD_CAKES'>
          Seafood Cakes
        </SectionButton>
        <SectionButton id='burgers' value='SEAFOOD_BURGERS'>
          Seafood Burgers
        </SectionButton>
        <SectionButton id='sausage' value='SEAFOOD_SAUSAGE'>
          Seafood Sausage
        </SectionButton>
        <SectionButton id='fillets' value='PREPARED_FILLETS'>
          Prepared Fillets
        </SectionButton>
        <SectionButton id='salads' value='SEAFOOD_SALADS'>
          Seafood Salads
        </SectionButton>
        <SectionButton id='stuffings' value='SEAFOOD_STUFFINGS'>
          Seafood Stuffings
        </SectionButton>
      </ButtonGroup>

      {filteredProducts.length > 0 ? (
        <ResponsiveTable className='pb-5'>
          <thead>
            <tr>
              <TableHeader>Item ID</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Case Pack</TableHeader>
              <TableHeader>Weight</TableHeader>
              <TableHeader>Quantity</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))}
          </tbody>
        </ResponsiveTable>
      ) : (
        <EmptyProductsContainer>
          {selectedCategory === 'FAVORITES' && (
            <h4>Add products to your favorites by clicking on the heart</h4>
          )}
          <h3 className='mt-5'>
            None of our products match this filter or category combination
          </h3>
        </EmptyProductsContainer>
      )}
    </Root>
  );
};

export default ProductsPage;
