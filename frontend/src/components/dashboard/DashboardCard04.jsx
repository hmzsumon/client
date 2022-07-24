import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../images/icon-03.svg';
import { getAgentWithdraws } from '../../redux/withdraw/withdrawSlice';
import EditMenu from '../header/EditMenu';

function DashboardCard04() {
  const dispatch = useDispatch();

  const { withdraws, pendingWithdraws } = useSelector(
    (state) => state.withdraw
  );

  useEffect(() => {
    dispatch(getAgentWithdraws());
  }, [dispatch]);

  return (
    <div className='flex flex-col col-span-full  sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between z-10 items-start mb-2'>
          {/* Icon */}
          <img
            src={Icon}
            width='32'
            height='32'
            alt='Icon 03'
            className='z-10'
          />
          {/* Menu button */}
          <EditMenu className='relative inline-flex'>
            <li>
              <Link
                to='/agent/withdraws'
                className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
              >
                Withdraws
              </Link>
            </li>
            <li>
              <NavLink
                className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
                to='/results'
              >
                Result
              </NavLink>
            </li>
          </EditMenu>
        </header>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>
          All Withdraws Request
        </h2>
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
              New
            </div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                {pendingWithdraws && pendingWithdraws.length}
              </div>
            </div>
          </div>
          <div>
            <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
              All
            </div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                {withdraws && withdraws.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
    </div>
  );
}

export default React.memo(DashboardCard04);
