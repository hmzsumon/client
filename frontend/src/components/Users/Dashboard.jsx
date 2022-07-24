import React from 'react';
import UserLayout from './UserLayout/UserLayout';

const Dashboard = () => {
  return (
    <UserLayout>
      <div className='flex pt-40 items-center justify-center'>
        <h1 className='text-xl md:text-3xl font-bold text-orange-600'>
          User Dashboard is Under Cooking
        </h1>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
