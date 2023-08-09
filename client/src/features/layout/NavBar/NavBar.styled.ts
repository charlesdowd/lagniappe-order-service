import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.12);
  height: 56px;
  border-radius: 12px;
`;

export const NavButton = styled.button`
  color: rgba(255, 255, 255, 0.6);
  border: none;
  background-color: rgba(255, 255, 255, 0);
  font-size: 16px;
  height: 100%;
  border-radius: 12px;
  font-weight: 500;

  @media (min-width: 992px) {
    padding: 16px 24px;
  }

  :hover {
    color: white;
  }
`;

export const Logo = styled.img`
  height: 69px;
  width: 150px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SignOutIcon = styled.img`
  height: 14px;
  width: auto;
  margin-right: 10px;
  @media (min-width: 1200px) {
    height: 18px;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  height: 36px;
  padding: 0 20px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: #353535;
  align-items: center;
`;

export const Text = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: white;
  @media (min-width: 1200px) {
    font-size: 16px;
  }
`;

export const ContactDiv = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  gap: 6px;
`;

export const RightSide = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PhoneImg = styled.img`
  height: 16px;
  @media (min-width: 1200px) {
    height: 28px;
  }
`;
