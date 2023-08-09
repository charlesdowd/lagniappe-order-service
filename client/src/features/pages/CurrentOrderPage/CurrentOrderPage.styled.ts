import styled from 'styled-components';
import Button from '../../../components/Button/Button';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 32px;
  color: #070f29;
  align-self: center;
`;

export const SubmitButtonDiv = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 24px;
`;

export const BannerRoot = styled.div`
  display: flex;
  padding: 24px 32px;
  border-radius: 12px;
  background-color: #353535;
  color: white;
  gap: 12px;

  @media (max-width: 475px) {
    flex-direction: column-reverse;
  }
`;

export const DeadlineText = styled.span`
  font-size: 14px;
  font-weight: 600;
  max-width: 272px;
`;

export const SubmitButton = styled(Button)`
  background-color: #f84e54;
  height: 56px;
`;

export const EmptyOrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 165px;
  max-width: 356px;
  text-align: center;
  align-self: center;
  gap: 16px;
`;

export const EmptyOrderText = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: #353535;
  a {
    color: #f84e54;
  }
`;
