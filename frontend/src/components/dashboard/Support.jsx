import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const Support = () => {
  return (
    <DashboardLayout>
      <div
        className='
    flex
    items-center
    justify-center
    
    
  '
      >
        <div className='px-4 md:px-40 py-20 bg-white rounded-md shadow-xl'>
          <div className='flex flex-col items-center'>
            <h1 className='font-bold text-blue-600 text-xl md:text-4xl'>
              SUPPORT
            </h1>

            <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              E-GROUP WORK Support
            </h6>

            <a
              href='https://t.me/+rvlTxHxj1UMwYTZh'
              target='_blank'
              className='px-6 py-2 text-sm font-semibold rounded-md text-blue-800 bg-blue-100'
              rel='noreferrer'
            >
              {' '}
              Click Me For Support
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
