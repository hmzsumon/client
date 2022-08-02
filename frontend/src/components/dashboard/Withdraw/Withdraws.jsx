import { default as React, useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { getUserWithdraws } from '../../../redux/withdraw/withdrawSlice';
import Table, { SelectColumnFilter } from '../../../table/Table'; // new
import DashboardLayout from '../../layouts/DashboardLayout';

function Withdraws() {
  const dispatch = useDispatch();

  const { withdraws, isLoading } = useSelector((state) => state.withdraw);

  // get all users
  useEffect(() => {
    dispatch(getUserWithdraws());
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ value, className }) => {
          return (
            <Moment format='MM-DD-YYYY'>
              <span className='text-red-500'>{value}</span>
            </Moment>
          );
        },
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

        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => {
          return (
            <div
              className={` capitalize ${
                value === 'cancelled' ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              <small>{value}</small>
            </div>
          );
        },
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: ({ value }) => {
          return (
            <div className='flex justify-center space-x-2'>
              <NavLink
                to={`/withdraw/edit/${value}`}
                onClick={() => console.log(value)}
                className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-2 rounded'
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
          <div className='flex items-center justify-center w-full h-screen'>
            <RingLoader color={'#36D7B7'} size={100} />
          </div>
        </div>
      ) : (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className=''>
              <h1 className='text-xl font-semibold'>
                Withdraws = {data.length}
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

export default Withdraws;
