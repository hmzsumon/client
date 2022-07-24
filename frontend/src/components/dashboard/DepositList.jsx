import { default as React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getDeposits } from '../../redux/deposit/depositSlice';
import Table, { SelectColumnFilter, StatusPill } from '../../table/Table'; // new
import DashboardLayout from '../layouts/DashboardLayout';

function DepositList() {
  const dispatch = useDispatch();

  const { deposits, isLoading } = useSelector((state) => state.deposit);

  // get all users
  useEffect(() => {
    dispatch(getDeposits());
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'TnxId',
        accessor: 'transactionId',
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
    ],
    []
  );

  const data = React.useMemo(() => deposits, [deposits]);
  const isLoadingData = React.useMemo(() => isLoading, [isLoading]);

  return (
    <DashboardLayout>
      {isLoadingData ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className=''>
              <h1 className='text-xl font-semibold'>Deposits Table = ❤</h1>
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

export default DepositList;
