import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { isLoggedIn } from '../../store/hooks';

import NavBar from './NavBar/NavBar';
import { Root } from './Layout.styled';

const PrivateLayout = () => {
  // Save location to redirect user to where they wanted to go after logging in
  const location = useLocation();

  // If user is not logged in, send them to home page
  if (!isLoggedIn())
    return <Navigate to='/login' replace state={{ from: location }} />;

  return (
    <>
      <NavBar />
      <Root>
        <Outlet />
      </Root>
    </>
  );
};

export default PrivateLayout;
