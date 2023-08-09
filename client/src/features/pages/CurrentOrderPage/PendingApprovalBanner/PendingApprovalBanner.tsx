import { isApproved } from '../../../../store/hooks';
import InfoIcon from '../../../../assets/info-icon.svg';
import {
  BannerTitle,
  BannerContainer,
  PendingApprovalDiv,
} from './PendingApproval.styled';

const PendingApprovalBanner = () => {
  // Do not render anything if user is already approved
  if (isApproved()) return;

  return (
    <PendingApprovalDiv className='outsideContainer'>
      <BannerContainer>
        <div style={{ display: 'flex', gap: '10px' }}>
          <img src={InfoIcon} height={14} style={{ marginTop: '2px' }} />
          <BannerTitle>Account not approved</BannerTitle>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 400, textAlign: 'left' }}>
          You currently can not place orders because your account is still
          pending approval with Lagniappe Foods. Once your account gets
          approved, you will will be notified and allowed to place orders.
        </div>
      </BannerContainer>
    </PendingApprovalDiv>
  );
};

export default PendingApprovalBanner;
