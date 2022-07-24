import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  approveWithdraw,
  getWithdraw,
  reset,
} from '../../../redux/withdraw/withdrawSlice';
import DashboardLayout from '../../layouts/DashboardLayout';

const Approved = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { withdraw, isLoading, appError, appLoading, appSuccess, appMessage } =
    useSelector((state) => state.withdraw);

  const [accountNumber, setAccountNumber] = useState('');
  const [tnxId, setTnxId] = useState('');

  useEffect(() => {
    dispatch(getWithdraw(id));
  }, [id, dispatch]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('approvedAccountNumber', accountNumber);
    myForm.set('approveTnxId', tnxId);
    myForm.set('withdrawId', id);

    for (let value of myForm.values()) {
      console.log(value);
    }
    dispatch(approveWithdraw(myForm));
  };

  useEffect(() => {
    if (appError) {
      toast.error(appMessage);
    }
    if (appSuccess) {
      toast.success(appMessage);
      history.goBack();
    }
    dispatch(reset());
  }, [withdraw, appError, appSuccess, appMessage, history, dispatch]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-gray-700 text-xl font-bold'>
                Withdraw Details
              </h6>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            {/* edit form */}
            <form onSubmit={handleSubmit}>
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                User Info
              </h6>
              <div className='flex flex-wrap'>
                {/* Recipient Full Name */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block  text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>User Name</span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      readOnly
                    >
                      {withdraw && withdraw.userName}
                    </li>
                  </div>
                </div>

                {/*  Full Name */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block  text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'> Full Name </span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      {withdraw && withdraw.userFullName}
                    </li>
                  </div>
                </div>

                {/*  Account Number & Method */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block  text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>
                        {' '}
                        <span className='text-green-500 capitalize'>
                          {withdraw && withdraw.method}
                        </span>{' '}
                        Number{' '}
                      </span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      {withdraw && withdraw.accountNumber}
                    </li>
                  </div>
                </div>

                {/* Amount */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block   text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>Amount </span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      {withdraw && withdraw.amount}$
                    </li>
                  </div>
                </div>

                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block   text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>Charge </span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      {withdraw && withdraw.withdrawCharge}$
                    </li>
                  </div>
                </div>

                {/* Net Amount  */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block   text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>Net Amount</span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      {withdraw && withdraw.netAmount} $
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
                      {withdraw && withdraw.netAmount * 85} BDT
                    </li>
                  </div>
                </div>

                {/* Dtae */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block   text-sm font-semibold mb-2'
                      htmlFor='grid-password'
                    >
                      <span className='text-gray-400'>Request At</span>
                    </label>
                    <li
                      type='text'
                      name='userNumber'
                      className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    >
                      <Moment format='DD-MM-YYYY h:m a'>
                        {withdraw && withdraw.createdAt}
                      </Moment>
                    </li>
                  </div>
                </div>

                {/* Status */}
                {withdraw && withdraw.status === 'approved' && (
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block   text-sm font-semibold mb-2'
                        htmlFor='grid-password'
                      >
                        <span className='text-gray-400'>Approve At</span>
                      </label>
                      <li
                        type='text'
                        name='userNumber'
                        className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      >
                        <Moment format='DD-MM-YYYY h:m a'>
                          {withdraw && withdraw.approvedAt}
                        </Moment>
                      </li>
                    </div>
                  </div>
                )}

                {withdraw && withdraw.status === 'approved' && (
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block   text-sm font-semibold mb-2'
                        htmlFor='grid-password'
                      >
                        <span className='text-gray-400'>Approve A/C No:</span>
                      </label>
                      <li
                        type='text'
                        name='userNumber'
                        className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      >
                        {withdraw && withdraw.approvedAccountNumber}
                      </li>
                    </div>
                  </div>
                )}

                {withdraw && withdraw.status === 'approved' && (
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block   text-sm font-semibold mb-2'
                        htmlFor='grid-password'
                      >
                        <span className='text-gray-400'>Approve TnxId:</span>
                      </label>
                      <li
                        type='text'
                        name='userNumber'
                        className='list-none border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      >
                        {withdraw && withdraw.approveTnxId}
                      </li>
                    </div>
                  </div>
                )}

                {/* A/C No: */}
                {withdraw && withdraw.status === 'pending' && (
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Your A/C: Number
                      </label>
                      <input
                        type='text'
                        name='number'
                        className='px-3 border-0 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                {/* User Name */}
                {withdraw && withdraw.status === 'pending' && (
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-gray-600 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Tnx Id
                      </label>
                      <input
                        type='text'
                        name='userName'
                        className='px-3 border-0 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={tnxId}
                        onChange={(e) => setTnxId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <hr className='mt-6 border-b-1 border-gray-300' />

              <div className='px-4 mt-6'>
                {appLoading ? (
                  <PulseLoader color={'#fff'} size={10} />
                ) : (
                  <button
                    type='submit'
                    className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400  disabled:cursor-not-allowed'
                    disabled={withdraw && withdraw.status === 'approved'}
                  >
                    {withdraw && withdraw.status === 'PENDING'
                      ? 'Confirm'
                      : 'Approved'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Approved;
