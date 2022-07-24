import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1> This is Admin Dashboard</h1>
      <NavLink
        to='users'
        className={(nav) => (nav.isActive ? 'text-red-500' : null)}
      >
        Users
      </NavLink>
      <NavLink
        to='withdraws'
        className={(nav) => (nav.isActive ? 'text-red-500' : null)}
      >
        {' '}
        Withdraws
      </NavLink>
      <Outlet />
    </div>
  );
};

export default Dashboard;
