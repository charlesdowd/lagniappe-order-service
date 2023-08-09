import { LoaderContainer } from './Loader.styled';
import { ClipLoader } from 'react-spinners';
import { FunctionComponent } from 'react';

export interface LoaderProps {
  size?: number;
  color?: string;
  loading?: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({
  size = 50,
  color = 'blue',
  loading = true, // Default to always loading
}) => {
  return (
    <LoaderContainer>
      <ClipLoader size={size} color={color} loading={loading} />
    </LoaderContainer>
  );
};

export default Loader;
