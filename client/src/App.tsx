import { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AppContainer } from './App.styled';
import PublicGuard from './features/layout/PublicGuard';
import AuthenticatedGuard from './features/layout/AuthenticatedGuard';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import Dashboard from './features/pages/Dashboard/Dashboard';
import VerifyEmail from './features/auth/VerifyEmail';
import SetPassword from './features/auth/SetPassword';
import ProductsPage from './features/pages/ProductPage/ProductsPage';
import SetPasswordGuard from './features/layout/SetPasswordGuard';
import VerifyEmailGuard from './features/layout/VerifyEmailGuard';
import AdminGuard from './features/layout/AdminGuard';
import AdminDashboard from './features/pages/Admin/AdminDashboard';
import ApproveAccounts from './features/pages/Admin/ApproveAccounts';
import CurrentOrderPage from './features/pages/CurrentOrderPage/CurrrentOrderPage';
import AdminOrderHistory from './features/pages/Admin/OrderHistory/AdminOrderHistory';
import ForgotPassword from './features/auth/ForgotPassword';
import {
  useGetAllProductsQuery,
  useGetOrdersQuery,
  useGetUserQuery,
} from './store/slices/api/templateApi';
import { isLoggedIn } from './store/hooks';
import ResetPasswordGuard from './features/layout/ResetPasswordGuard';
import ResetPassword from './features/auth/ResetPassword';

/*
  Layout and Guard wrapper routes help redirect user to correct route
*/

const App: FunctionComponent = () => {
  const loggedIn = isLoggedIn();

  // Currently we do not use the data returned from the getUserQuery since we
  // are setting the auth.user in our redux store in our extraReducer.
  // We could pass it to some of our components if we wanted to but are not
  // using that pattern. We use selectors to get the auth.user state instead.

  // Fetch user info, all current products, and user order history

  useGetUserQuery(null, {
    skip: !loggedIn,
  });
  useGetAllProductsQuery(null, {
    skip: !loggedIn,
  });
  useGetOrdersQuery(null, {
    skip: !loggedIn,
  });

  return (
    <AppContainer>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicGuard />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>

        {/* Unique Routes with their own guards*/}
        <Route element={<VerifyEmailGuard />}>
          <Route path='verify-email' element={<VerifyEmail />} />
        </Route>
        <Route element={<SetPasswordGuard />}>
          <Route path='set-password' element={<SetPassword />} />
        </Route>
        <Route element={<ResetPasswordGuard />}>
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<AuthenticatedGuard />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='current-order' element={<CurrentOrderPage />} />

          {/* Admin Routes inside of Authenticated Guard (NavBar is included) */}
          <Route path='admin' element={<AdminGuard />}>
            <Route index element={<AdminDashboard />} />
            <Route path='approve-accounts' element={<ApproveAccounts />} />
            <Route path='orders' element={<AdminOrderHistory />} />
          </Route>
        </Route>

        {/* Catch other routes and send them to correct page. TODO: add 404 page */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
