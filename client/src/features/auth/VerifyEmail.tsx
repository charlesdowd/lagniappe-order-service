import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../store/slices/api/templateApi';
import Loader from '../../components/Loader/Loader';

type ContextType = { emailToken: string };

const VerifyEmail = () => {
  const [verifyEmail] = useVerifyEmailMutation();

  const { emailToken } = useOutletContext<ContextType>();

  useEffect(() => {
    // NOTE: verifyEmail is triggered twice due to React.StrictMode issue.
    // The component gets mounted twice so this useEffect runs twice only in dev

    verifyEmail({ body: { emailToken } });
  }, []);

  return <Loader size={200} />;
};

export default VerifyEmail;
