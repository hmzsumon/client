import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../header/EditMenu';

function DashboardCard01({ user }) {
  const { isLoading } = useSelector((state) => state.auth);
  const { creditBalance } = user;

  return (
    <div className='flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      {isLoading ? (
        <div className='flex items-center justify-center w-full py-6 '>
          <RingLoader color={'#36D7B7'} size={60} />
        </div>
      ) : (
        <div className='px-5 pt-5'>
          <header className='flex justify-between items-start z-10 mb-2'>
            {/* Icon */}
            <img
              src={Icon}
              width='32'
              height='32'
              alt='Icon 01'
              className=' z-10'
            />
            {/* Menu button */}
            <EditMenu className='relative inline-flex'>
              <li>
                <Link
                  className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
                  to='/deposit'
                >
                  Deposit
                </Link>
              </li>
              <li>
                <Link
                  className='font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3'
                  to='/deposit/history'
                >
                  History
                </Link>
              </li>
            </EditMenu>
          </header>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>
            Credit Wallet
          </h2>
          <div className='text-xs font-semibold text-slate-400 uppercase mb-1'>
            balance
          </div>
          {user.role === 'user' ? (
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                <span className=' text-sm'>BDT</span> &nbsp;
                {creditBalance
                  ? Number(creditBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
              <div className='text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full'>
                fee 0%
              </div>
            </div>
          ) : (
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                $
                {user.agentBalance
                  ? Number(user.agentBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
              <div className='text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full'>
                fee 0%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(DashboardCard01);
