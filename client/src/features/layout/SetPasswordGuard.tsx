import { Outlet, Navigate } from 'react-router-dom';
import { isSettingPassword } from '../../store/hooks';
import { PublicContainer, PublicRoot } from './Layout.styled';

const SetPasswordGuard = () => {
  const settingPassword = isSettingPassword();

  // Protect this page from users who should not be here
  if (!settingPassword) return <Navigate to='/' replace />;

  return (
    <PublicRoot>
      <PublicContainer>
        <Outlet />
      </PublicContainer>
    </PublicRoot>
  );
};

export default SetPasswordGuard;
