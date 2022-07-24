import { default as React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getSecondGeneration } from '../../../redux/generation/genSlice';
import Table, { SelectColumnFilter, StatusPill } from '../../../table/Table'; // new
import DashboardLayout from '../../layouts/DashboardLayout';

function SecondGeneration() {
  const dispatch = useDispatch();

  const { secondGens, isLoading } = useSelector((state) => state.generation);

  // get all users
  useEffect(() => {
    dispatch(getSecondGeneration());
    return () => null;
  }, [dispatch]);

  // columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: '_id',
      },
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Credit',
        accessor: 'creditBalance',
      },
      {
        Header: 'Withdrawal',
        accessor: 'incomeBalance',
      },
      {
        Header: 'Package',
        accessor: 'packageName',
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

  const data = React.useMemo(() => secondGens, [secondGens]);
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
              <h1 className='text-xl font-semibold'>
                Second Generations = {data.length}
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

export default SecondGeneration;
