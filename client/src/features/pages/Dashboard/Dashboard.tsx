import { Root } from './Dashboard.styled';
import DashboardBanner from './DashboardBanner';
import UserOrderHistory from './UserOrderHistory';

const Dashboard = () => {
  return (
    <Root>
      <DashboardBanner />
      <UserOrderHistory />
    </Root>
  );
};

export default Dashboard;
