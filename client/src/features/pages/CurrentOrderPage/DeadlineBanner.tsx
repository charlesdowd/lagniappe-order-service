import { BannerRoot, DeadlineText } from './CurrentOrderPage.styled';
import InfoIcon from '../../../assets/info-icon.svg';

const DeadlineBanner = () => {
  return (
    <BannerRoot>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Todays Date</span>
          <DeadlineText>
            {new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              hour: 'numeric',
            }).format(new Date())}
          </DeadlineText>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Order Deadline</span>
          <DeadlineText>Wednesday, 10 AM</DeadlineText>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '5px' }}>
        <img src={InfoIcon} height={14} style={{ marginTop: '3px' }} />
        <DeadlineText>
          Orders placed before the deadline will ship out Wednesday evening and
          be available Thursday morning
        </DeadlineText>
      </div>
    </BannerRoot>
  );
};

export default DeadlineBanner;
