import React from 'react';
import {
  FaChevronCircleDown,
  FaChevronCircleRight,
  FaCoins,
  FaHandHoldingUsd,
  FaTasks,
} from 'react-icons/fa';

const HowDo = () => {
  return (
    <section className='bg-[#74BB53] h-auto w-full py-10 px-10 md:px-20 flex flex-col items-center'>
      <h1 className='mb-10 text-3xl font-bold text-center text-white'>
        HOW DOES IT WORK?
      </h1>
      <div className='items-center space-y-4 md:space-y-0 md:space-x-8 md:flex'>
        <div className='flex flex-col items-center w-full md:w-[280px] h-[200px] p-5 space-y-3 bg-gray-200'>
          <div className='bg-[#0E75BB] p-4 rounded-full'>
            <FaTasks className='text-4xl text-white' />
          </div>
          <h1 className='text-2xl text-[#0E75BB] font-bold'>Do Task</h1>
          <p className='text-center'>
            Fill in surveys, watch videos, play games and more
          </p>
        </div>
        <FaChevronCircleRight className='hidden text-4xl text-white md:inline-block' />
        <FaChevronCircleDown className='mx-auto text-4xl text-white md:hidden' />
        <div className='flex flex-col items-center w-full md:w-[280px] h-[200px] p-5 space-y-3 bg-gray-200'>
          <div className='bg-[#0E75BB] p-4 rounded-full'>
            <FaCoins className='text-4xl text-white' />
          </div>
          <h1 className='text-2xl text-[#0E75BB] font-bold'>Earn Points</h1>
          <p className='text-center'>Get rewarded for your time</p>
        </div>
        <FaChevronCircleRight className='hidden text-4xl text-white md:inline-block' />
        <FaChevronCircleDown className='mx-auto text-4xl text-white md:hidden' />
        <div className='flex flex-col items-center w-full md:w-[280px] h-[200px] p-5 space-y-3 bg-gray-200'>
          <div className='bg-[#0E75BB] p-4 rounded-full'>
            <FaHandHoldingUsd className='text-4xl text-white' />
          </div>
          <h1 className='text-2xl text-[#0E75BB] font-bold'>Get Paid</h1>
          <p className='text-center'>
            Redeem your points for cash, crypto currencies or gift cards
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowDo;
