import styled from 'styled-components';

export const Root = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HistoryRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
  text-align: left;
  padding-top: 180px;
  padding-bottom: 50px;
`;

export const BannerRoot = styled.div`
  height: 62px;
  background-color: rgb(53, 53, 53);
  width: 100%;
  position: absolute;
`;

export const RedSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 124px;
  border-radius: 24px;
  background-color: #f84e54;
  color: white;
  padding: 0 40px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Title = styled.span`
  color: #070f29;
  font-weight: 600;
  font-size: 28px;
`;

export const BannerText = styled.span`
  color: white;
  font-weight: 600;
  font-size: 14px;
  a {
    font-size: 16px;
    color: white;
  }

  @media (max-width: 768px) {
    a {
      font-size: 12px;
    }
    font-size: 12px;
  }
`;

export const TagLine = styled(BannerText)`
  font-size: 32px;
  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const EmptyHistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 110px;
  gap: 16px;
  max-width: 356px;
  text-align: center;
  align-self: center;
`;

export const DescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;
