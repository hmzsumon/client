import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getGenerationsLength,
  reset,
} from '../../../redux/generation/genSlice';
import DashboardLayout from '../../layouts/DashboardLayout';

const Generation = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, fistGenCount, secondGenCount } = useSelector(
    (state) => state.generation
  );

  useEffect(() => {
    dispatch(getGenerationsLength());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className=' grid grid-cols-1 md:grid-cols-2 mx-auto md:w-9/12 items-center justify-center gap-6'>
        <NavLink
          to='/first-gen'
          className='   text-center gap-4 bg-green-500 py-2 px-6 rounded-md text-white text-2xl font-semibold'
        >
          <h2>1st Generations</h2>
          <div className='flex items-center justify-center gap-4'>
            <FaUsers className='text-white' /> <p>{fistGenCount}</p>
          </div>
        </NavLink>
        <NavLink
          to='/second-gen'
          className='   text-center gap-4 bg-green-500 py-2 px-6 rounded-md text-white text-2xl font-semibold'
        >
          <h2>2st Generations</h2>
          <div className='flex items-center justify-center gap-4'>
            <FaUsers className='text-white' /> <p>{secondGenCount}</p>
          </div>
        </NavLink>
      </div>
    </DashboardLayout>
  );
};

export default Generation;
