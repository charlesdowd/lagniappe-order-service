import { Root } from '../Dashboard/Dashboard.styled';
import Button from '../../../components/Button/Button';
import {
  useAdminApproveAccountMutation,
  useAdminGetUsersQuery,
} from '../../../store/slices/api/templateApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ApproveAccounts = () => {
  /*
   Instead of new endpoint to grab admin users, use get all users and 
   then use built in functionality to filter the result for only admin users

   This is not efficient if we had many users but since we expect to not
   have many users in production, this is fine. Also fun new tool.
  */
  const { data: filteredUsers } = useAdminGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.users?.filter((user) => !user.approved),
    }),
  });

  const [approveUser, { isLoading, isSuccess, isError }] =
    useAdminApproveAccountMutation();

  const handleClick = (userId) => {
    approveUser({ body: { userId } });
  };

  // Handle success + error cases
  useEffect(() => {
    if (isSuccess) {
      toast.success('Account approved successfully');
    }
    if (isError) {
      toast.error('Failed to approve account');
    }
  }, [isSuccess, isError]);

  return (
    <Root>
      <h1>Approve Accounts Tool</h1>
      <div className='mt-4' style={{ width: '100%' }}>
        <h2>Current Unapproved Accounts</h2>
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            className='mt-1'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>{user.email}</div>
            <Button
              variant='secondary'
              loading={isLoading}
              onClick={() => handleClick(user._id)}
            >
              Click to Approve User
            </Button>
          </div>
        ))}
      </div>
    </Root>
  );
};

export default ApproveAccounts;
