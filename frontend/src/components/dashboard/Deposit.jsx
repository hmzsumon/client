import { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { depositRequest, reset } from '../../redux/deposit/depositSlice';
import CopyBtn from '../Reusable/CopyBtn';

const depositOptions = [
  { id: 1, name: 'Bkash', number: '01981387695', value: 'bkash', type: 'p' },
  {
    id: 2,
    name: 'Rocket',
    number: '01981387695-5',
    value: 'rocket',
    type: 'p',
  },
  { id: 4, name: 'Nagad', number: '01617412044', value: 'nagad2', type: 'p' },
];

const Deposit = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.deposit
  );

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [, setBdtAmount] = useState(0);
  const [userNumber, setUserNumber] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [open, setOpen] = useState(false);

  const [inputErrors, setInputErrors] = useState({});

  console.log(inputErrors.method);

  // handle select method
  const handleSelectMethod = (e) => {
    const selectMethod = depositOptions.find(
      (item) => item.value === e.target.value
    );
    setSelectedMethod(selectMethod);
    setMethod(e.target.value);
  };

  const handleOpen = () => {
    setInputErrors(validate({ method, amount }));
    if (!selectedMethod) {
      toast.error('Please select a method');
      return;
    }
    setOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('method', method);
    myForm.set('amount', amount);
    myForm.set('accountNumber', userNumber);
    myForm.set('transactionId', transactionId);
    myForm.set('bdtAmount', amount * 85);

    // for (let key of myForm.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    dispatch(depositRequest(myForm));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      history.push('/dashboard');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, history, isAuthenticated]);

  // validate amount
  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Amount Required';
    }
    if (values.amount <= 10) {
      errors.amount = 'Amount must be greater than 10 or equal to 10';
    }
    if (!values.method) {
      errors.method = 'Method Required';
    }
    return errors;
  };

  return (
    <DashboardLayout>
      <>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-gray-700 text-xl font-bold'>Deposit Funds</h6>
              <button
                className=' hidden md:block bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                Your Balance: BDT 0.00
              </button>

              <NavLink
                to='/deposit/history'
                className='bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                Deposit History
              </NavLink>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            {/* edit form */}
            <div>
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Deposit Funds
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
                      className={`px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        inputErrors.amount
                          ? 'border border-red-500'
                          : 'border-0'
                      }`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Select options */}
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-gray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Select Bank
                    </label>
                    <select
                      name='newPassword'
                      className={` px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150${
                        inputErrors.method
                          ? 'border border-red-500'
                          : 'border-0'
                      }`}
                      defaultValue='jesse@example.com'
                      onChange={(e) => handleSelectMethod(e)}
                    >
                      <option value='DEFAULT'>Choose a Method</option>
                      {depositOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Confirm Password */}
                {open && (
                  <>
                    {/* user's method */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-600 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          Please enter Your account Number.
                        </label>
                        <input
                          type='text'
                          name='userNumber'
                          className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          value={userNumber}
                          onChange={(e) => setUserNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Agent Section */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-600 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          Please Send Money to this Personal Account{' '}
                          <span className='text-orange-400'>
                            {selectedMethod.number}{' '}
                          </span>
                          Number.
                        </label>
                        <div className='flex relative'>
                          <input
                            type='text'
                            name='confirmPassword'
                            className='border-0 disabled:cursor-not-allowed px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            value={selectedMethod.number}
                            readOnly
                            disabled
                          />
                          <span className=' absolute right-3 top-3'>
                            <CopyBtn
                              text={selectedMethod.number}
                              icon={<FaRegCopy />}
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount BDT */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-gray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Amount BDT
                        </label>
                        <input
                          type='number'
                          name='amount'
                          className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full cursor-not-allowed ease-linear transition-all duration-150'
                          value={amount}
                          onChange={(e) => setBdtAmount(e.target.value)}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Transaction Number */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-600 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          Enter Transaction Number
                        </label>
                        <input
                          type='text'
                          name='transactionNumber'
                          className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <hr className='mt-6 border-b-1 border-gray-300' />

              {open && (
                <div className='px-4 mt-6'>
                  <button
                    type='submit'
                    className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400  disabled:cursor-not-allowed'
                    disabled={
                      !amount ||
                      !selectedMethod ||
                      !userNumber ||
                      !transactionId ||
                      isLoading
                    }
                    onClick={submitHandler}
                  >
                    {isLoading ? (
                      <PulseLoader color={'#fff'} size={10} />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              )}
            </div>
            {!open && (
              <div className='px-4 mt-6'>
                <button
                  onClick={() => handleOpen()}
                  className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400  disabled:cursor-not-allowed'
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default Deposit;
