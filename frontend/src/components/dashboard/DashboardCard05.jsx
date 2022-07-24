import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../header/EditMenu';

function DashboardCard02() {
  const { updatedUser } = useSelector((state) => state.auth);
  const { dailyIncomeBalance, dailyTask } = updatedUser;

  return (
    <div className='flex flex-col col-span-full z-10 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between z-20 items-start mb-2'>
          {/* Icon */}
          <img
            src={Icon}
            width='32'
            height='32'
            alt='Icon 02'
            className='z-0'
          />
          {/* Menu button */}
          <EditMenu className='relative inline-flex'>
            <li>
              <Link
                className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
                to='/works'
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
                to='/withdraws/history'
              >
                History
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>
          Daily Income
        </h2>
        <div className='flex items-center justify-between'>
          {/* Left */}
          <div>
            <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
              balance
            </div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                <span className=' text-sm'>BDT</span> &nbsp;
                {dailyIncomeBalance
                  ? Number(dailyIncomeBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
              {/* <div className='text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full'>
                fee 7%
              </div> */}
            </div>
          </div>
          {/* right */}
          <div>
            <NavLink
              to='/works'
              className='text-xs font-semibold bg-green-500 px-4 py-2 text-white rounded uppercase mb-1'
            >
              do task
            </NavLink>
            <div className='flex '>
              <div className='text-3xl flex  w-full items-center justify-center font-bold text-center text-slate-800 '>
                <p className='text-center '>{dailyTask && dailyTask.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DashboardCard02);
