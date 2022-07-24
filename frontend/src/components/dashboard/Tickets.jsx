import { default as React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getUserTickets } from '../../redux/ticket/ticketSlice';
import Table, { SelectColumnFilter, StatusPill } from '../../table/Table'; // new
import DashboardLayout from '../layouts/DashboardLayout';

function Tickets() {
  const dispatch = useDispatch();

  const { userTickets, isLoading } = useSelector((state) => state.ticket);

  // get all users
  useEffect(() => {
    dispatch(getUserTickets());
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ticket No:',
        accessor: 'ticketNumber',
      },
      {
        Header: 'Prise',
        accessor: 'price',
      },
      {
        Header: 'Next Draw',
        accessor: 'nextDrawTime',
      },
      {
        Header: 'Result',
        accessor: 'result',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Prize',
        accessor: 'prize',
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

  const data = React.useMemo(() => userTickets, [userTickets]);
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
                Your All Tickets = {userTickets.length}
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

export default React.memo(Tickets);
