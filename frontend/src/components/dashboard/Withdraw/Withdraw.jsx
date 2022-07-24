import { useCallback, useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import { NavLink, useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import ops from '../../../assets/images/elements/oops.png';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { createWithdraw, reset } from '../../../redux/withdraw/withdrawSlice';

const depositOptions = [
  { id: 1, name: 'Bkash', number: '01847207766', value: 'bkash' },
  { id: 2, name: 'Rocket', number: '01798880080-3', value: 'rocket' },
  { id: 3, name: 'Nagad', number: '01847207766', value: 'nagad' },
];

const Withdraw = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, isError, isWithdraw, message } = useSelector(
    (state) => state.withdraw
  );

  const { isAuthenticated, updatedUser: user } = useSelector(
    (state) => state.auth
  );

  //get all agents

  useEffect(() => {
    if (user.status === 'inactive') {
      toast.error('Your account is inactive. Please contact admin.');
      history.push('/dashboard');
    }
  }, [user, history]);

  const initialState = {
    amount: Number(0),
    method: '',
    userNumber: '',
  };

  const [next, setNext] = useState(false);

  const [formValues, setFormValues] = useState(initialState);

  const [inputErrors, setInputErrors] = useState({});

  // handle change of select box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setInputErrors(validate(formValues));
    if (!formValues.amount) {
      toast.error('Please enter amount');
      return;
    }
    if (!formValues.method) {
      toast.error('Please select method');
      return;
    }
    setNext(true);
  };

  //Model
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onCloseModal2 = () => setOpen2(false);
  const closeIcon = <AiOutlineCloseCircle size={30} color='#F74747' />;

  // check if user incomeBalance is greater than or equal to amount
  const checkBalance = useCallback(() => {
    if (user.incomeBalance < 0) {
      onOpenModal();
      return false;
    }
  }, [user.incomeBalance]);

  useEffect(() => {
    checkBalance();
  }, [checkBalance]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(inputErrors).length) {
      setInputErrors(validate(formValues));
      return;
    }
    const myForm = new FormData();
    myForm.set('method', formValues.method);
    myForm.set('amount', Number(formValues.amount));
    myForm.set('accountNumber', formValues.userNumber);
    // myForm.set('agentId', formValues.agent);

    // for (let key of myForm.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    dispatch(createWithdraw(myForm));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }

    if (isError) {
      toast.error(message);
    }

    if (isWithdraw) {
      setOpen2(true);
      setFormValues(initialState);
    }

    dispatch(reset());
  }, [isError, isWithdraw, message, dispatch, isAuthenticated, formValues]);

  // validate amount
  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Amount Required';
    } else if (values.amount < 90) {
      errors.amount = 'Amount must be greater than 100 or equal to 100';
    }
    if (!values.method) {
      errors.method = 'Method Required';
    }
    if (!values.userNumber) {
      errors.userNumber = 'User Number Required';
    }
    // if (!values.agent) {
    //   errors.agent = 'Agent Required';
    // }
    return errors;
  };

  return (
    <DashboardLayout>
      <>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-gray-700 text-xl font-bold'>Withdraw</h6>
              <button
                className=' hidden md:block bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                Your Withdraw Balance: <span className=' text-sm'>BDT</span>{' '}
                &nbsp;
                {user.incomeBalance
                  ? user.incomeBalance.toFixed(2)
                  : (0.0).toFixed(2)}
              </button>

              <NavLink
                to='/withdraws/history'
                className='bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
              >
                View History
              </NavLink>
            </div>
            <div className='py-4 text-center'>
              <h2>
                Your Withdraw Balance:{' '}
                {user.incomeBalance
                  ? user.incomeBalance.toFixed(2)
                  : (0.0).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            {/*  form */}
            <form onSubmit={submitHandler}>
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Withdraw Details
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
                      className={`px-3 py-3 placeholder-gray-300 bg-white rounded text-sm shadow  focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        inputErrors.amount
                          ? 'border border-red-500 text-red-500'
                          : 'border-0 text-gray-600 '
                      }`}
                      value={formValues.amount}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <small className='text-red-500 text-center'>
                      {inputErrors.amount}
                    </small>
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
                      name='method'
                      className={` px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150${
                        inputErrors.method
                          ? 'border border-red-500'
                          : 'border-0'
                      }`}
                      defaultValue='jesse@example.com'
                      onChange={(e) => handleChange(e)}
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
                {/* Hidden Section */}
                {next && (
                  <>
                    {/* user's method */}
                    <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className={`block ${
                            inputErrors.userNumber ? 'text-red-500' : ''
                          } text-gray-600 text-sm font-semibold mb-2`}
                          htmlFor='grid-password'
                        >
                          Please enter Your{' '}
                          <span className='text-green-600 capitalize'>
                            {formValues.method}
                          </span>{' '}
                          account number.
                        </label>
                        <input
                          type='text'
                          name='userNumber'
                          className={` px-3 py-3 placeholder-gray-300 ${
                            inputErrors.userNumber
                              ? 'text-red-500 border-red-500 border'
                              : 'text-gray-600 border-0'
                          } bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                          value={formValues.userNumber}
                          onChange={(e) => handleChange(e)}
                        />
                        <small>{inputErrors.userNumber}</small>
                      </div>
                    </div>

                    {/* Agent Section */}
                    {/* <div className='w-full lg:w-6/12 px-4'>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block  text-gray-600 text-sm font-semibold mb-2'
                          htmlFor='grid-password'
                        >
                          Please Select Your Agent
                        </label>
                        <select
                          name='agent'
                          className={` px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150${
                            inputErrors.agent
                              ? 'border border-red-500 text-rdd-500'
                              : 'border-0'
                          }`}
                          defaultValue='jesse@example.com'
                          onChange={(e) => handleChange(e)}
                        >
                          <option value='DEFAULT'>Choose a Agent </option>
                          {agents.map((agent) => (
                            <option key={agent._id} value={agent._id}>
                              {agent.fullName}
                            </option>
                          ))}
                        </select>
                        <small className='text-red-500'>
                          {inputErrors.agent}
                        </small>
                      </div>
                    </div> */}
                  </>
                )}
              </div>

              <hr className='mt-6 border-b-1 border-gray-300' />

              {next && (
                <div className='px-4 mt-6'>
                  <button
                    type='submit'
                    className='bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  '
                  >
                    {isLoading ? (
                      <PulseLoader color={'#fff'} size={10} />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              )}
            </form>
            {!next && (
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
      {/* Model Section */}

      <Modal
        open={open}
        onClose={() => onCloseModal()}
        closeIcon={closeIcon}
        center
      >
        {/* Check Balance */}

        <div className='px-6 w-full'>
          <h2 className='text-xl font-semibold text-red-700'>
            Insufficient balance
          </h2>
          <div className='fex items-center justify-center'>
            <img src={ops} alt='' className='w-60' />
          </div>
        </div>
        {/* go back */}
        <button
          onClick={() => history.goBack()}
          className='text-xl font-semibold text-blue-700'
        >
          <u>Go Back </u>
        </button>
      </Modal>
      {/* Confirm Request Model */}
      <Modal
        open={open2}
        onClose={() => onCloseModal2()}
        closeIcon={closeIcon}
        center
      >
        {/* Check Balance */}

        <div className='px-4 md:px-10'>
          <div className=' w-full'>
            <h2 className='text-xl font-semibold text-green-500 '>
              Your Request has been sent. Please wait for the Admin to confirm
            </h2>
          </div>
          {/* go back */}
          <button
            onClick={() => history.goBack()}
            className='text-xl font-semibold text-blue-700'
          >
            <u>Go Back </u>
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Withdraw;
