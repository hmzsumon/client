import { default as React } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Table, { SelectColumnFilter, StatusPill } from '../../../table/Table'; // new
import DashboardLayout from '../../layouts/DashboardLayout';

function AgentWithdraws() {
  const { withdraws, isLoading } = useSelector((state) => state.withdraw);

  // get all users
  //   useEffect(() => {
  //     dispatch(getUserWithdraws());
  //   }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ value, className }) => {
          return (
            <div>
              <Moment format='MM-DD-YYYY' className='text-gray-500 text-sm'>
                {value}
              </Moment>
            </div>
          );
        },
      },
      {
        Header: 'User Name',
        accessor: 'userName',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Charge',
        accessor: 'withdrawCharge',
      },

      {
        Header: 'Net Amount',
        accessor: 'netAmount',
      },

      {
        Header: 'Method',
        accessor: 'method',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusPill,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ value }) => {
          return (
            <div className='flex justify-center'>
              <NavLink
                to={`/withdraw/edit/${value}`}
                onClick={() => console.log(value)}
                className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded'
              >
                View
              </NavLink>
            </div>
          );
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => withdraws, [withdraws]);
  const isLoadingData = React.useMemo(() => isLoading, [isLoading]);

  return (
    <DashboardLayout>
      {isLoadingData ? (
        <div>
          {' '}
          <h1>Hello</h1>
        </div>
      ) : (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className=''>
              <h1 className='text-xl font-semibold'>Withdraws = ❤</h1>
            </div>
            <div className='mt-6'>
              <Table columns={columns} data={data} />
            </div>
          </main>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AgentWithdraws;
