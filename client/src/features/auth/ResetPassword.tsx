import { useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { useResetPasswordMutation } from '../../store/slices/api/templateApi';
import Loader from '../../components/Loader/Loader';

type ContextType = { resetToken: string };

const ResetPassword = () => {
  const [resetPassword, { isError }] = useResetPasswordMutation();

  const { resetToken } = useOutletContext<ContextType>();

  useEffect(() => {
    // NOTE: verifyEmail is triggered twice due to React.StrictMode issue.
    // The component gets mounted twice so this useEffect runs twice only in dev

    resetPassword({ body: { resetToken } });
  }, []);

  // If invalid resetToken is used and resetPassword fails, navigate home
  if (isError) return <Navigate to='/' replace />;

  return <Loader size={200} />;
};

export default ResetPassword;
