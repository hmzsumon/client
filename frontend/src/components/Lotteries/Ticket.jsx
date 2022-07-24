import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import img1 from '../../assets/images/elements/person-2.png';
import win from '../../assets/images/elements/win.png';

const Ticket = ({ ticket }) => {
  const { nextDrawTime, ticketNumber, price, firstPrize } = ticket;

  const { referId } = useSelector((state) => state.auth);

  // for Model
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const closeIcon = <AiOutlineCloseCircle size={30} color='#F74747' />;

  // handle click on open modal
  const handleClick = () => {
    onOpenModal();
  };
  return (
    <div className='col-span-12 md:col-span-4 sm:col-span-6 ticket'>
      <div className=' w-full relative h-[150px] border-[#33b5f7] border-b-2 shadow-lg rounded-sm bg-transparent'>
        <div className='px-2 py-4 grid grid-cols-12'>
          <div className='win  absolute '>
            <div className='flex flex-col space-y-3'>
              <img src={win} alt='w-20' className='w-14 mx-auto' />
              <small className='text-gray-700'>Next draw: {nextDrawTime}</small>
            </div>
          </div>
          <div className='col-span-8 px-2 flex flex-col space-y-4  justify-between'>
            <small className='text-gray-700 font-semibold'>
              No:{ticketNumber}
            </small>
            <img src='./images/up-icon.png' alt='' className='w-12 ' />
            <small className='text-gray-700 font-semibold'>
              Price: ${price}
            </small>
          </div>
          <div className='col-span-4 flex flex-col items-center justify-center'>
            <img src={img1} alt='' className='w-16 ' />
            <h2 className='text-xl font-semibold text-orange-300'>
              ${firstPrize}
            </h2>
          </div>
        </div>
        <div className='flex items-center  justify-center'>
          <button
            className='py-1 px-6 -bottom-4 mx-auto absolute  text-white rounded-full text-center  bg-[#33b5f7]'
            onClick={handleClick}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div>
        <Modal open={open} onClose={onCloseModal} closeIcon={closeIcon} center>
          <h2 className='text-[#33b5f7] text-xl font-medium'>
            You won the lottery!
          </h2>
          <p className='w-[300px]'>Please Login Or Sing Up Free </p>
          <div className='flex items-center justify-between'>
            <NavLink
              to='/login'
              className=' bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6'
            >
              <span className='text-white'>Login</span>
            </NavLink>
            <NavLink
              to={`/register?refer_id=${referId}&place=a`}
              className=' bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6'
            >
              <span className='text-white'>Sign Up</span>
            </NavLink>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Ticket;
