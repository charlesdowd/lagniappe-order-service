import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Root } from '../Dashboard/Dashboard.styled';

const AdminDashboard = () => {
  return (
    <Root>
      <h1>Admin Dashboard</h1>
      <div className='mt-4'>
        <Link to='/admin/approve-accounts' className='m-4'>
          <Button size='lg'>Approve Accounts</Button>
        </Link>
        <Link to='/admin/orders' className='m-4'>
          <Button size='lg'>Order History</Button>
        </Link>
      </div>
    </Root>
  );
};

export default AdminDashboard;
