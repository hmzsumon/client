import React from 'react';
import Confetti from 'react-confetti';
import { useDispatch } from 'react-redux';
import Box from '../../assets/images/elements/box.png';
import { openLuckyBox } from '../../redux/ticket/ticketSlice';

const BoxItem = ({ luckyBox, open, imgWidth }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfetti, setIsConfetti] = React.useState(false);

  const handleOpen = () => {
    dispatch(openLuckyBox(luckyBox._id));
    setIsOpen(true);
    setIsConfetti(true);
    setTimeout(() => {
      setIsConfetti(false);
    }, 5000);
  };
  return (
    <div
      className='col-span-4  flex items-center justify-center cursor-pointer'
      onClick={() => handleOpen(luckyBox)}
    >
      {isOpen ? (
        <p>{luckyBox.luckyAmount}$</p>
      ) : (
        <img src={Box} alt='' className={`w-${imgWidth}`} />
      )}
      {open && isConfetti && <Confetti style={{ top: '-1px' }} />}
    </div>
  );
};

export default BoxItem;
