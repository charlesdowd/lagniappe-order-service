import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const PendingApprovalDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 24px;
  gap: 8px;
  background-color: #f84e5414;
`;

export const BannerTitle = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #353535;
  min-width: 150px;
`;

export const BannerContainer = styled(Container)`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;
