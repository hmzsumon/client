import { format } from 'date-fns';
import { default as React, useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getTicketsByDrawDate } from '../../redux/ticket/resultsSlice';
import Table, { SelectColumnFilter, StatusPill } from '../../table/Table'; // new
import DashboardLayout from '../layouts/DashboardLayout';

function Results() {
  const dispatch = useDispatch();

  const { tickets, isLoading, draw } = useSelector((state) => state.results);

  // get all users
  useEffect(() => {
    dispatch(getTicketsByDrawDate(format(new Date(), 'yyyy/MM/dd')));
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Ticket No:',
        accessor: 'ticketNumber',
      },
      {
        Header: 'Prise',
        accessor: 'price',
      },
      {
        Header: 'Name',
        accessor: 'ownerName',
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

  const data = React.useMemo(() => tickets, [tickets]);
  const isLoadingData = React.useMemo(() => isLoading, [isLoading]);
  const drawData = React.useMemo(() => draw, [draw]);

  const resultDate = React.useMemo(() => {
    return format(new Date(), ` dd - mm - yyyy hh:mm a`);
  }, []);

  return (
    <DashboardLayout>
      {isLoadingData ? (
        <div className='flex items-center justify-center w-full py-6 '>
          <RingLoader color={'#36D7B7'} size={60} />
        </div>
      ) : (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div className='flex items-center mb-6 justify-center'>
              <h1 className='text-xl text-gray-700 font-semibold'>
                Draw Date:{' '}
                <Moment format={'dd - MM - yyyy hh:mm a'}>
                  {new Date() + 1}
                </Moment>
              </h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              <h1 className='text-xl font-semibold'>
                Tickets = {drawData.totalTickets}
              </h1>
              <h1 className='text-xl font-semibold'>
                winner = {drawData.winners}{' '}
              </h1>
              <h1 className='text-xl font-semibold'>
                Losers = {drawData.losers}{' '}
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

export default Results;
