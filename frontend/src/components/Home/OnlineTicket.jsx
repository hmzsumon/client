import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getTickets } from '../../redux/ticket/ticketSlice';
import Ticket from '../Lotteries/Ticket';

const Lottery1 = () => {
  const dispatch = useDispatch();

  const { tickets, isLoading } = useSelector((state) => state.ticket);

  const [limit, setLimit] = useState(6);

  const handleLimit = (e) => {
    setLimit((prev) => prev + 6);
  };

  useEffect(() => {
    dispatch(getTickets(limit));
  }, [limit, dispatch]);

  return (
    <div>
      {/* <!-- online-ticket-section start --> */}
      <section className='online-ticket-section section-padding'>
        <div className='px-4 md:px-16'>
          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='section-header text-center'>
                <h2 className='section-title text-2xl md:text-6xl text-gray-800 font-bold'>
                  Buy Lottery Tickets Online
                </h2>
                <p className='text-gray-700 md:w-6/12 mx-auto '>
                  Play the lottery online safely and securely at the Lottery,
                  the leading lottery ticket purchasing service in the world.
                </p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className='flex items-center justify-center w-full py-6 '>
              <RingLoader color={'#36D7B7'} size={60} />
            </div>
          ) : (
            <div className='grid grid-cols-12  gap-8 my-20'>
              {tickets.map((ticket, i) => (
                <Ticket key={i} ticket={ticket} />
              ))}
            </div>
          )}
          <div
            className='flex items-center  justify-center'
            onClick={handleLimit}
          >
            <button className='py-1 px-6 -bottom-4 mx-auto   text-white rounded-full text-center  bg-[#33b5f7]'>
              Load More
            </button>
          </div>
        </div>
      </section>
      {/* <!-- online-ticket-section end --> */}
    </div>
  );
};

export default Lottery1;
