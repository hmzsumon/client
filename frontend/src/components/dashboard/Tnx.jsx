import { default as React, useEffect } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getLoggedInUserTnxs } from '../../redux/tnx/tnxSlice';
import Table, { SelectColumnFilter } from '../../table/Table'; // new
import DashboardLayout from '../layouts/DashboardLayout';

function Tnx() {
  const dispatch = useDispatch();

  const { tnxCount, tnxs, isLoading } = useSelector((state) => state.tnx);

  // get all users
  useEffect(() => {
    dispatch(getLoggedInUserTnxs());
    // return () => null;
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ value }) => {
          return (
            <Moment format='MM-DD-YYYY ' className='text-gray-500 text-sm'>
              <span>{value}</span>
            </Moment>
          );
        },
      },
      {
        Header: 'Tnx ID',
        accessor: '_id',
      },
      {
        Header: 'Tnx Type',
        accessor: 'transactionType',
        Cell: ({ value }) => {
          return (
            <span
              className={` text-sm ${
                value === 'cashOut' ? 'text-red-400' : 'text-green-500 '
              }`}
            >
              {value === 'cashIn' ? 'Cash In' : 'Cash Out'}
            </span>
          );
        },

        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }) => {
          return <span className='text-gray-500 text-sm'>{value}</span>;
        },
      },
      {
        Header: 'Amount',
        accessor: 'amount',

        Cell: ({ value }) => {
          return (
            <div className='flex items-center'>
              <span className='text-gray-500  text-sm text-right'>
                {value.toFixed(2)}
              </span>
              <TbCurrencyTaka />
            </div>
          );
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => tnxs, [tnxs]);
  const tnxCountData = React.useMemo(() => tnxCount, [tnxCount]);
  const isLoadingData = React.useMemo(() => isLoading, [isLoading]);

  return (
    <DashboardLayout>
      {isLoadingData ? (
        <div className='flex items-center justify-center w-full py-6 '>
          <RingLoader color={'#36D7B7'} size={60} />
        </div>
      ) : (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className=''>
              <h1 className='text-xl font-semibold'>
                Your All Tnx = {tnxCountData}
              </h1>
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

export default React.memo(Tnx);
