import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { agentCreate, reset } from '../../redux/auth/agentSlice';
import DashboardLayout from '../layouts/DashboardLayout';
import Input from '../Reusable/Input';

const methods = [
  { id: 1, name: 'Bkash', value: 'bkash' },
  { id: 2, name: 'Rocket', value: 'rocket' },
  { id: 3, name: 'Nagad', value: 'nagad' },
];

const ApplyAgent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { updatedUser: user } = useSelector((state) => state.auth);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.agent
  );

  // initialState
  const initialState = {
    userName: '',
    agentName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',

    method: '',
    methodNumber: '',
    facebook: '',
  };
  const [agent, setAgent] = React.useState(initialState);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prevState) => ({ ...prevState, [name]: value }));
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('userName', agent.userName);
    myForm.set('agentName', agent.agentName);
    myForm.set('password', agent.password);
    myForm.set('confirmPassword', agent.confirmPassword);
    myForm.set('email', agent.email);
    myForm.set('phoneNumber', agent.phoneNumber);
    myForm.set('address', agent.address);
    myForm.set('city', agent.city);
    myForm.set('state', agent.state);
    myForm.set('zip', agent.zip);
    myForm.set('method', agent.method);
    myForm.set('methodNumber', agent.methodNumber);
    myForm.set('facebook', agent.facebook);
    dispatch(agentCreate(myForm));
    for (let pair of myForm.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  };

  useEffect(() => {
    if (user.isAgent) {
      history.push('/dashboard');
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      history.push('/dashboard');
    }

    dispatch(reset());
  }, [user.isAgent, history, isError, isSuccess, message, dispatch]);
  return (
    <DashboardLayout>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-gray-700 text-xl font-bold'>
              Agent Information
            </h6>
            <button
              className='bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Agent
            </button>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          {/* edit form */}
          <form onSubmit={handleSubmit}>
            {/* <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Information
            </h6> */}
            <div className='flex flex-wrap mt-3'>
              {/* User name */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='userName'
                  handleChange={handleChange}
                  value={agent.userName}
                  label={'User name'}
                />
              </div>

              {/* Agent name */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='agentName'
                  handleChange={handleChange}
                  value={agent.agentName}
                  label={'Agent name'}
                />
              </div>

              {/* password */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='password'
                  name='password'
                  handleChange={handleChange}
                  value={agent.password}
                  label={'Password'}
                />
              </div>

              {/* confirm password */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='password'
                  name='confirmPassword'
                  handleChange={handleChange}
                  value={agent.confirmPassword}
                  label={'Confirm Password'}
                />
              </div>

              {/* Email */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='email'
                  name='email'
                  handleChange={handleChange}
                  value={agent.email}
                  label={'Email'}
                />
              </div>

              {/* Agent Section */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block  text-gray-600 text-sm font-semibold mb-2'
                    htmlFor='grid-password'
                  >
                    Please Select a payment method (bikash, rocket, nagad)
                  </label>
                  <select
                    name='method'
                    className={` px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                    value={agent.method}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value='DEFAULT'>Choose a Method </option>
                    {methods.map((method) => (
                      <option key={method.id} value={method.value}>
                        {method.name}
                      </option>
                    ))}
                  </select>

                  {/* <small className='text-red-500'>{inputErrors.agent}</small> */}
                </div>
              </div>
              {agent.method && (
                <div className='w-full lg:w-6/12 px-4'>
                  <Input
                    type='text'
                    name='methodNumber'
                    handleChange={handleChange}
                    value={agent.methodNumber}
                    label={`Enter ${agent.method} A/C: Number`}
                  />
                </div>
              )}
              {/* End Select Options */}
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />

            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Contact Information
            </h6>
            <div className='flex flex-wrap'>
              {/* Address */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='address'
                  handleChange={handleChange}
                  value={agent.address}
                  label={'Address'}
                />
              </div>
              {/* Phone Number */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='phoneNumber'
                  handleChange={handleChange}
                  value={agent.phoneNumber}
                  label={'Phone Number'}
                />
              </div>
              {/* City */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='city'
                  handleChange={handleChange}
                  value={agent.city}
                  label={'City'}
                />
              </div>
              {/* State */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='state'
                  handleChange={handleChange}
                  value={agent.state}
                  label={'State'}
                />
              </div>
              {/* Zip */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='zip'
                  handleChange={handleChange}
                  value={agent.zip}
                  label={'Zip'}
                />
              </div>
              {/* facebook */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='facebook'
                  handleChange={handleChange}
                  value={agent.facebook}
                  label={'Facebook (Profile Link)'}
                  placeholder={'https://www.facebook.com/'}
                />
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />
            <div className='px-4 mt-6'>
              <button className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                {isLoading ? (
                  <PulseLoader color={'#fff'} size={10} />
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyAgent;
