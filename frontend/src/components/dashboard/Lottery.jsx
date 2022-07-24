import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import LotteryImg from '../../images/lottery.png';
import {
  buyTicket,
  getTickets,
  getUserLuckyBoxes,
  reset,
} from '../../redux/ticket/ticketSlice';
import Ticket from './Ticket';

const Lottery = () => {
  const dispatch = useDispatch();

  const { tickets, luckyBoxes, isLoading, isError, isBuy, message } =
    useSelector((state) => state.ticket);

  // user form state
  const { updatedUser } = useSelector((state) => state.auth);

  const [limit, setLimit] = useState(9);

  // handle limit
  const handleLimit = (e) => {
    setLimit((prev) => prev + 6);
  };

  // handle buy ticket
  const handleBuy = (id, price, onCloseModal) => {
    if (updatedUser.creditBalance < price) {
      toast.error(
        'You need to have at least $' + price + ' credit balance to buy ticket'
      );
      return;
    }
    dispatch(buyTicket(id));
    onCloseModal();
  };

  useEffect(() => {
    dispatch(getTickets(limit));
  }, [dispatch, limit]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isBuy) {
      toast.success(message);
      dispatch(getUserLuckyBoxes());
    }

    dispatch(reset());
  }, [isError, message, dispatch, isBuy]);

  return (
    <DashboardLayout>
      <div className='space-y-4 '>
        <div className='grid grid-cols-12 items-center justify-center'>
          <div className='space-y-4  col-span-12 md:col-span-7'>
            <h1 className='text-2xl md:text-3xl  font-medium text-gray-700 text-center'>
              Take the chance to change your life
            </h1>
            <p className='text-md md:w-9/12 mx-auto text-gry-700 text-center'>
              Upworking is online lottery platform inspired by few Upworking
              lover's fantasy of the ultimate lottery platfrom.
            </p>
          </div>
          <div className=' flex items-center justify-center col-span-12 md:col-span-5'>
            <img src={LotteryImg} alt='' className='w-96' />
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className='flex  items-center justify-center w-full py-6 '>
              <RingLoader color={'#36D7B7'} size={60} />
            </div>
          ) : (
            <div className='grid  grid-cols-12  gap-8 mb-10'>
              {tickets.map((ticket, i) => {
                return (
                  <Ticket
                    key={i}
                    ticket={ticket}
                    handleBuy={handleBuy}
                    userBalance={updatedUser.creditBalance}
                    luckyBoxes={luckyBoxes}
                  />
                );
              })}
            </div>
          )}
          <div
            className='flex items-center  justify-center'
            onClick={handleLimit}
          >
            <button className='flex items-center justify-center underline hover:text-[#33b5f7]   mx-auto   text-gray-700  text-center  '>
              Load More <BsThreeDots className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default React.memo(Lottery);
