import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

function Package({ item, handleBuy, user, handleUpgrade }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className='flex flex-col col-span-full z-10 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 pt-5'>
        <header className='flex justify-between z-20  mb-2'>
          <h2 className='text-lg font-semibold text-center text-slate-800 mb-2'>
            {item.name}
          </h2>
        </header>
        <main className=' space-y-2'>
          <div className='flex items-center justify-between'>
            <div>
              <li className=' list-none flex items-center '>
                Price:{' '}
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {item.price}
              </li>
            </div>
            <div>
              <li className=' list-none flex items-center '>
                Cashback:{' '}
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {item.cashback}
              </li>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <li className=' list-none flex items-center '>
                Daily Profit:{' '}
                <span>
                  <TbCurrencyTaka />
                </span>{' '}
                {item.dailyProfit}
              </li>
            </div>
            <div>
              <li className=' list-none flex items-center '>
                Daily Task: {item.tasksLimit}
              </li>
            </div>
          </div>
        </main>
        <footer className='my-4 text-center'>
          {pathname === '/dashboard' && (
            <button
              className={`text-xs font-semibold ${
                user.package === item._id ? 'bg-orange-500' : 'bg-green-500'
              } bg-green-500 px-4 py-2 text-white rounded uppercase mb-1`}
              onClick={() => handleBuy(item)}
              disabled={user.package === item._id}
            >
              {user.package === item._id ? 'Active' : 'Buy Now'}
            </button>
          )}
          {pathname === '/upgrade' && (
            <button
              className={`text-xs font-semibold ${
                user.package === item._id ? 'bg-orange-500' : 'bg-green-500'
              } bg-green-500 px-4 py-2 text-white rounded uppercase mb-1`}
              onClick={() => handleUpgrade(item)}
              disabled={user.package === item._id}
            >
              {user.package === item._id ? 'Active' : 'Upgrade'}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

export default React.memo(Package);
