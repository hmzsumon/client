import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import confirm from '../../assets/images/elements/cofirm2.png';
import ops from '../../assets/images/elements/oops.png';
import img1 from '../../assets/images/elements/person-2.png';
import win from '../../assets/images/elements/win.png';
import BoxItem from './BoxItem';

const Ticket = ({ ticket, handleBuy, userBalance, luckyBoxes }) => {
  const { nextDrawTime, _id, ticketNumber, price, firstPrize, status } = ticket;

  const { isBuyLoading } = useSelector((state) => state.ticket);

  // for Model
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [confetti, setConfetti] = React.useState(false);
  const [isWin, setIsWin] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const closeIcon = <AiOutlineCloseCircle size={30} color='#F74747' />;

  // handle click on open modal
  const handleOpenModal = () => {
    onOpenModal();
  };

  // handle Confetti
  const handleConfetti = () => {
    setConfetti(true);
    setInterval(() => {
      setConfetti(false);
    }, 8000);
  };

  // handle second modal
  const handleOpenSecondModal = () => {
    setOpenSecond(true);
    setIsWin(true);
  };
  console.log(confetti);
  return (
    <div className='col-span-12 md:col-span-4 sm:col-span-6 ticket'>
      <div
        className={`w-full relative h-[150px] ${
          isWin ? 'border-red-400' : 'border-[#33b5f7]'
        } border-b-2 shadow-lg rounded-sm bg-transparent`}
      >
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
            <img src='../images/up-icon.png' alt='' className='w-12 ' />
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
          {/* Loader */}
          {isBuyLoading ? (
            <div className='py-1 px-6 -bottom-4 mx-auto disabled:cursor-not-allowed absolute  text-white rounded-full bg-[#33b5f7] text-center '>
              <BeatLoader size={12} color='#fff' />
            </div>
          ) : (
            <button
              className={`py-1 px-6 -bottom-4 mx-auto disabled:cursor-not-allowed absolute  text-white rounded-full text-center  ${
                isWin ? 'bg-red-400' : 'bg-[#33b5f7]'
              }`}
              onClick={() => handleOpenModal(ticket)}
              disabled={isWin}
            >
              {isWin ? 'Sold' : 'Buy Now'}
            </button>
          )}
        </div>
      </div>
      <div>
        <Modal open={open} onClose={onCloseModal} closeIcon={closeIcon} center>
          {/* Check Balance */}
          {userBalance < price ? (
            <div className='px-6 w-full'>
              <h2 className='text-xl font-semibold text-red-700'>
                Insufficient balance
              </h2>
              <div className='fex items-center justify-center'>
                <img src={ops} alt='' className='w-60' />
              </div>
              <NavLink to='/deposit' className='text-blue-500'>
                <h2 className='text-xl font-semibold text-blue-700'>
                  <u>Deposit</u>
                </h2>
              </NavLink>
            </div>
          ) : (
            <div className=' px-8 space-y-2'>
              <h2 className='text-[#33b5f7] text-sm font-medium'>
                You are about to buy ticket No: {ticketNumber}
              </h2>
              <div className=''>
                <img src={confirm} alt='' className='w-20 mx-auto' />
              </div>

              <div className='flex items-center justify-center'>
                <button
                  className=' bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6'
                  onClick={() => {
                    handleBuy(_id, price, onCloseModal);
                    handleOpenSecondModal();
                  }}
                >
                  <span className='text-white'>Confirm</span>
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Model for lucky box */}
        <Modal open={openSecond} onClose={() => setOpenSecond(false)} center>
          <h2 className='text-xl text-center text-gray-700 '>
            {' '}
            You have a Lucky box
          </h2>
          <div className=' min-w-60 h-36 flex items-center justify-center '>
            {luckyBoxes.map((luckyBox) => (
              <div key={luckyBox._id} onClick={handleConfetti}>
                <BoxItem luckyBox={luckyBox} open={false} imgWidth={'32'} />
              </div>
            ))}
          </div>
        </Modal>
      </div>
      {confetti && <Confetti style={{ top: '-1px' }} />}
    </div>
  );
};

export default React.memo(Ticket);
