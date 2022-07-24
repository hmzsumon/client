import { TbCurrencyTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

import dollars from '../../assets/images/elements/dollars.png';

const DailyWork = ({ task, taskValue }) => {
  const { title, url, price } = task;

  return (
    <div className='flex flex-col col-span-full z-10 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='px-5 py-5'>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>{title}</h2>

        <div className='flex items-center justify-between'>
          {/* Left */}
          <div>
            <div className='flex items-start'>
              <div className='text-3xl font-bold text-slate-800 mr-2'>
                <img
                  src={url}
                  width='100'
                  // height='32'
                  alt='Icon 02'
                  className='z-0'
                />
              </div>
              <div className=' space-y-3'>
                <div className='text-sm mb-10 font-semibold text-white px-1.5 bg-yellow-500 rounded-full'>
                  {price} BDT
                </div>
                <NavLink
                  to={`/works/view`}
                  className='text-sm  font-semibold py-2 text-white px-4 bg-green-500 rounded-md'
                >
                  View
                </NavLink>
              </div>
            </div>
          </div>
          {/* right */}
          <div>
            <div>
              <img src={dollars} alt='' className='w-16' />
            </div>
            <div className='flex items-start'>
              <div className='text-3xl flex items-center font-bold text-center text-slate-800 mr-2'>
                <span>
                  <TbCurrencyTaka />
                </span>
                {taskValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;
