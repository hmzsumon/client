import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../header/EditMenu';

function DashboardCard03() {
  const dispatch = useDispatch();
  const { updatedUser } = useSelector((state) => state.auth);
  const { lotteryBalance, ticketsCount } = updatedUser;

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
                to='/user/tickets'
                className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
              >
                Tickets
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
          Lottery Wallet
        </h2>
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
              Tickets
            </div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                {ticketsCount}
              </div>
            </div>
          </div>
          <div>
            <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
              Wining balance
            </div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                <span className=' text-sm'>BDT</span> &nbsp;
                {lotteryBalance
                  ? Number(lotteryBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
    </div>
  );
}

export default React.memo(DashboardCard03);
