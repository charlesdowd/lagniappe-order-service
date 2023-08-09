import { Outlet, Navigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';

const ResetPasswordGuard = () => {
  const user = useAppSelector(selectUser);
  const [searchParams] = useSearchParams();

  // Grab emailToken from URL
  const resetToken = searchParams.get('resetToken');

  if (user || !resetToken) return <Navigate to='/' replace />;

  // Pass emailToken to VerifyEmail component
  return <Outlet context={{ resetToken }} />;
};

export default ResetPasswordGuard;
