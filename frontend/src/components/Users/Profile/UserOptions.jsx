import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const UserOptions = () => {
  const { user } = useSelector((state) => state.auth.user);
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-center '>
        <FaUser className='p-1 text-2xl rounded-full  cursor-pointer text-my_color2 ring-2 ring-my_color1' />
      </div>
      <p className='text-sm text-white'>{user.firstName}</p>
    </div>
  );
};

export default UserOptions;
