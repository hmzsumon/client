import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { NavLink, useHistory } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { activate, reset } from '../../redux/auth/activeSlice';

function NotActiveCard() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { updatedUser: user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.active
  );

  // for Model
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const closeIcon = <AiOutlineCloseCircle size={30} color='#F74747' />;

  const handler = (event) => {
    event.preventDefault();
    if (user.creditBalance < 1000) {
      toast.error(
        'You need to have at least BDT 1000 credit balance to activate your account'
      );
      history.push('/deposit');
    }
    dispatch(activate());
  };

  useEffect(() => {
    if (user.status === 'inactive') {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div className='relative bg-indigo-400 p-4 sm:p-6 rounded-sm overflow-hidden mb-8'>
          {/* Background illustration */}

          {/* Content */}
          <div className='relative'>
            <h1 className='text-xl md:text-3xl text-slate-800 font-bold mb-1'>
              Your Account is Inactive Please Byu a Package and Active Your
              Account.
            </h1>
            <NavLink
              to='/dashboard'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6'
            >
              Go to Dashboard
            </NavLink>
          </div>
        </div>
      )}

      <div>
        <Modal open={open} onClose={onCloseModal} closeIcon={closeIcon} center>
          <h2 className='text-red-500 py-6 text-xl font-medium'>
            Your Account is Inactive Please Byu a Package and Active Your
          </h2>

          <NavLink
            to='/dashboard'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6'
          >
            Go to Dashboard
          </NavLink>
        </Modal>
      </div>
    </>
  );
}

export default NotActiveCard;
