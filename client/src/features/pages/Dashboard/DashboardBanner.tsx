import { Container } from 'react-bootstrap';
import {
  BannerRoot,
  BannerText,
  RedSection,
  TagLine,
  RightSide,
} from './Dashboard.styled';

const DashboardBanner = () => {
  return (
    <BannerRoot>
      <Container>
        <RedSection>
          <TagLine>Seafood, With A Little Something Extra</TagLine>
          <RightSide>
            <BannerText>Email Billing Department</BannerText>
            <BannerText>
              <a href='mailto: arap@lagniappefoods.com'>
                arap@lagniappefoods.com
              </a>
            </BannerText>
          </RightSide>
        </RedSection>
      </Container>
    </BannerRoot>
  );
};

export default DashboardBanner;
