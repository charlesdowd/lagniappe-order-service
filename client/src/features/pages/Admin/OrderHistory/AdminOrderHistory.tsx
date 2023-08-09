import DataTable from 'react-data-table-component';
import { Root } from './AdminOrderHistory.styled';
import { useAdminGetOrdersQuery } from '../../../../store/slices/api/templateApi';
import ExpandedRow from './ExpandedRow';

// TODO: Refactor based on conversation with Dylan. Add expandable row component + possible 'Processed' column
const AdminOrderHistory = () => {
  const { data: orderData, isLoading } = useAdminGetOrdersQuery();

  const columns = [
    {
      name: 'Email',
      selector: (row) => row.customer.email,
    },
    {
      name: 'Company',
      selector: (row): string => row.customer.company || 'N/A',
    },
    {
      name: 'Date Created',
      selector: (row) => new Date(row.createdAt).toLocaleDateString('en-US'),
    },
    {
      name: 'PO #',
      selector: (row) => row.poNumber || 'N/A',
    },
  ];
  return (
    <Root>
      <h1>Order History</h1>
      {isLoading ? (
        <h3>...Loading</h3>
      ) : (
        <div className='mt-4' style={{ width: '100%' }}>
          <DataTable
            title='Click on rows to show more data'
            columns={columns}
            data={orderData?.orders}
            highlightOnHover
            expandableRows
            expandOnRowClicked
            expandableRowsHideExpander
            expandableRowsComponent={ExpandedRow}
            dense
          />
        </div>
      )}
    </Root>
  );
};

export default AdminOrderHistory;
