import { Outlet, Navigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';

const VerifyEmailGuard = () => {
  const user = useAppSelector(selectUser);
  const [searchParams] = useSearchParams();

  // Grab emailToken from URL
  const emailToken = searchParams.get('emailToken');

  if (user?.emailVerified || !emailToken) return <Navigate to='/' replace />;

  // Pass emailToken to VerifyEmail component
  return <Outlet context={{ emailToken }} />;
};

export default VerifyEmailGuard;
