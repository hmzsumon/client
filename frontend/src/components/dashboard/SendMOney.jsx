import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { reset, searchUser } from '../../redux/auth/authSlice';
import {
  reset as sendReset,
  sendMoney,
} from '../../redux/deposit/depositSlice';

const SendMoney = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    searchUser: recipient,
    isSearchUserLoading,
    isError,
    isSearchError,
    isSearchSuccess,
    searchMessage,
    message,
    updatedUser,
  } = useSelector((state) => state.auth);

  const { role, agentBalance, creditBalance } = updatedUser;

  // deposit slice
  const {
    isError: sendError,
    isLoading: sendLoading,
    message: sendMessage,
    isSuccess: sendSuccess,
  } = useSelector((state) => state.deposit);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [amount, setAmount] = useState(0);
  const [userName, setUserName] = useState('');

  const [open, setOpen] = useState(false);

  // handle search user
  const handleSearch = () => {
    // check self user
    if (userName === updatedUser.userName) {
      toast.error('You can not send money to yourself');
      return;
    }

    // check role is agent to agent
    if (role === 'agent' && recipient.role === 'agent') {
      toast.error('You can not send money to agent');
      return;
    }

    dispatch(searchUser(userName));
  };

  useEffect(() => {
    if (isSearchError) {
      toast.error(searchMessage);
      dispatch(reset());
    }
    if (isSearchSuccess) {
      setOpen(true);
    }
    return () => {
      dispatch(reset());
    };
  }, [recipient, isSearchError, searchMessage, dispatch, isSearchSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('amount', amount);
    myForm.set('recipientId', recipient._id);

    // for (let key of myForm.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    dispatch(sendMoney(myForm));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }

    if (isError) {
      toast.error(message);
    }

    if (sendError) {
      toast.error(sendMessage);
    }

    if (sendSuccess) {
      toast.success(sendMessage);
      dispatch(sendReset());
      history.push('/dashboard');
    }

    dispatch(reset());

    return () => {
      dispatch(sendReset());
    };
  }, [
    isError,
    message,
    dispatch,
    history,
    isAuthenticated,
    sendError,
    sendMessage,
    sendSuccess,
  ]);

  return (
    <DashboardLayout>
      <>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-gray-700 text-xl font-bold'>Send Funds</h6>
              <button
                className='  bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                Your Balance: {role === 'user' ? creditBalance : agentBalance}$
              </button>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            {/* edit form */}
            <div>
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Send Funds
              </h6>
              <div className='flex flex-wrap'>
                {/* Amount usd */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Amount
                    </label>
                    <input
                      type='number'
                      name='amount'
                      className='px-3 border-0 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* User Name */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      User Name
                    </label>
                    <input
                      type='text'
                      name='userName'
                      className='px-3 border-0 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Recipient Details */}
                {open && recipient && (
                  <>
                    {/* Recipient Full Name */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-400 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          <span className='text-gray-400'>Full Name</span>
                        </label>
                        <li
                          type='text'
                          name='userNumber'
                          className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          readOnly
                        >
                          {recipient.fullName}
                        </li>
                      </div>
                    </div>

                    {/* Recipient Phone Number */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-400 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          <span className='text-gray-400'>
                            {' '}
                            Contact Number{' '}
                          </span>
                        </label>
                        <li
                          type='text'
                          name='userNumber'
                          className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        >
                          {recipient.phoneNumber}
                        </li>
                      </div>
                    </div>

                    {/* Amount BDT */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block   text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          <span className='text-gray-400'>Amount in BDT</span>
                        </label>
                        <li
                          type='text'
                          name='userNumber'
                          className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        >
                          {amount} BDT
                        </li>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <hr className='mt-6 border-b-1 border-gray-300' />

              {open && (
                // confirm button
                <div className='px-4 mt-6'>
                  <button
                    type='submit'
                    className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400  disabled:cursor-not-allowed'
                    disabled={!amount}
                    onClick={submitHandler}
                  >
                    {sendLoading ? (
                      <PulseLoader color={'#fff'} size={10} />
                    ) : (
                      'Confirm'
                    )}
                  </button>
                </div>
              )}
            </div>
            {!open && (
              <div className='px-4 mt-6'>
                <button
                  type='submit'
                  className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400  disabled:cursor-not-allowed'
                  disabled={!amount}
                  onClick={handleSearch}
                >
                  {isSearchUserLoading ? (
                    <PulseLoader color={'#fff'} size={10} />
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default SendMoney;
