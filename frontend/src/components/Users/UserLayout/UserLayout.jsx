import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserNav from '../../header/UserNav';

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth.user);
  return (
    <div className='md:grid grid-cols-6'>
      <div className=' col-span-1 '>
        <UserNav />
      </div>
      <div className=' col-span-5'>
        <div className='pt-[75px] md:pt-0'>
          <div>
            <NavLink
              to='/user/profile'
              className=' py-4 flex justify-end px-10'
            >
              <div className='hidden space-y-2 md:flex flex-col items-center justify-center'>
                <div className='  '>
                  <FaUser className='p-1 text-2xl rounded-full  cursor-pointer text-my_color2 ring-2 ring-my_color1' />
                </div>
                <p className='text-sm text-gray-800'>{user.firstName}</p>
              </div>
            </NavLink>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
