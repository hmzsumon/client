import { Link, NavLink } from 'react-router-dom';
import FlipClockCard from './FlipClock';

const Banner = () => {
  return (
    <>
      <section className='banner'>
        <div className='h-[25rem] px-6 space-y-20 bg-[rgba(0,0,0,0.5)] flex flex-col items-center justify-center'>
          <div className='space-y-4 '>
            <h1 className='text-2xl md:text-5xl  font-medium text-white text-center'>
              Take the chance to change your life
            </h1>
            <p className='text-md uppercase text-white text-center'>
              Upworking is online lottery platform inspired by few Upworking
              lover's fantasy of the ultimate lottery platfrom.
            </p>
          </div>
          <Link to='/register'>
            <span className='py-4 px-8 bg-[#62A642] text-white text-xl uppercase rounded '>
              Join Free Today
            </span>
          </Link>
        </div>
      </section>
      <div className=' md:h-60 space-y-6 flex items-center justify-center flex-wrap bg-gray-100 py-12 px-6 md:px-24'>
        {/* Title Section */}
        <div className='w-full text-center md:w-1/2 md:pr-20 space-y-3'>
          <h2 className='text-2xl md:text-3xl text-gray-700 font-semibold'>
            Buy Lottery Tickets Online
          </h2>
          <p>
            Buy lottery tickets online to the biggest lotteries in the world
            offering huge jackpot prizes that you can win when you play online
            lottery.
          </p>
          <div className='flex items-center  justify-center'>
            <NavLink
              to='/lotteries'
              className='py-1 px-6  mx-auto text-white rounded-full text-center  bg-[#33b5f7]'
            >
              Buy Now
            </NavLink>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <FlipClockCard />
        </div>
      </div>
    </>
  );
};

export default Banner;
