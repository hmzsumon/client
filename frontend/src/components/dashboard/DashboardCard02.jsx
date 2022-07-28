import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function DashboardCard02() {
  const { updatedUser } = useSelector((state) => state.auth);
  const { incomeBalance, firstGenBonus, secondGenBonus, dailyIncomeBalance } =
    updatedUser;

  return (
    <div className='flex flex-col col-span-full py-4 z-10 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 pt-5'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-slate-800 mb-2'>
            Income Wallet
          </h2>
          {updatedUser.status === 'active' && (
            <NavLink
              to='/upgrade'
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            >
              Upgrade
            </NavLink>
          )}
        </div>

        <div className='grid grid-cols-2  gap-4 items-center justify-center'>
          <div className='flex flex-col  col-span-1 '>
            <div className='text-sm  font-semibold text-slate-400  mb-1'>
              1st Gen <sup className='text-xs text-green-500'>10% & 5%</sup>
            </div>
            <div className='flex'>
              <div className='flex items-center text-sm font-bold text-slate-800 mr-2'>
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {firstGenBonus
                  ? Number(firstGenBonus).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
            </div>
          </div>
          {/*  secondGenBonus */}
          <div className='flex flex-col col-span-1 '>
            <div className='text-sm font-semibold text-slate-400  mb-1'>
              2st Gen <sup className='text-xs text-green-500'>2.5%</sup>
            </div>
            <div className='flex'>
              <div className='flex items-center text-sm font-bold text-slate-800 mr-2'>
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {secondGenBonus
                  ? Number(secondGenBonus).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
            </div>
          </div>

          {/*  dailyIncomeBalance */}
          <div className='flex flex-col col-span-1 '>
            <div className='text-sm font-semibold text-slate-400  mb-1'>
              Daily + <sup className='text-xs text-green-500'>3.6%</sup>
            </div>
            <div className='flex'>
              <div className='flex items-center text-sm font-bold text-slate-800 mr-2'>
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {dailyIncomeBalance
                  ? Number(dailyIncomeBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
            </div>
          </div>

          {/*  incomeBalance */}
          <div className='flex flex-col col-span-1 '>
            <div className='text-sm font-semibold text-slate-400  mb-1'>
              Total
            </div>
            <div className='flex'>
              <div className='flex items-center text-sm font-bold text-slate-800 mr-2'>
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {incomeBalance
                  ? Number(incomeBalance).toFixed(2)
                  : Number(0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DashboardCard02);
