import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { createUser, reset } from '../../redux/auth/authSlice';
import DashboardLayout from '../layouts/DashboardLayout';
import Input from '../Reusable/Input';

const placements = [
  { id: 1, name: 'A', value: 'a' },
  { id: 2, name: 'B', value: 'b' },
  { id: 3, name: 'C', value: 'c' },
  { id: 4, name: 'D', value: 'd' },
  { id: 5, name: 'E', value: 'e' },
];

const CreateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    updatedUser: user,
    isCreateUserLoading,
    isCreateUserSuccess,
    isCreateUserError,
    createUserMessage,
  } = useSelector((state) => state.auth);

  const initialState = {
    userName: '',
    placement: '',
    password: '',
    confirmPassword: '',
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    facebook: user.facebook,
  };
  const [newUser, setNewUser] = React.useState(initialState);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmPassword) {
      toast.error('Password does not match');
      return;
    }
    // check creditBalance
    if (newUser.creditBalance < 15) {
      toast.error('Credit balance is less than 15');
      return;
    }
    const myForm = new FormData();
    myForm.set('userName', newUser.userName);
    myForm.set('placement', newUser.placement);
    myForm.set('password', newUser.password);

    dispatch(createUser(myForm));
    for (let pair of myForm.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  };

  useEffect(() => {
    if (user.isAgent) {
      history.push('/dashboard');
    }
    if (isCreateUserError) {
      toast.error(createUserMessage);
    }
    if (isCreateUserSuccess) {
      toast.success(createUserMessage);
      history.push('/dashboard');
      dispatch(reset());
    }
  }, [
    isCreateUserSuccess,
    isCreateUserError,
    createUserMessage,
    user,
    history,
    dispatch,
  ]);
  return (
    <DashboardLayout>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-gray-700 text-xl font-bold'>
              User Information
            </h6>
            <button
              className='bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Members: {user.totalMembers}
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
                  value={newUser.userName}
                  label={'User name'}
                />
              </div>

              {/* placement Section */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block  text-gray-600 text-sm font-semibold mb-2'
                    htmlFor='grid-password'
                  >
                    Please Select a Placement
                  </label>
                  <select
                    name='placement'
                    className={` px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                    value={newUser.placement}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value='DEFAULT'>Choose a Placement </option>
                    {placements.map((place) => (
                      <option key={place.id} value={place.value}>
                        {place.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* End Select Options */}

              {/* password */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='password'
                  name='password'
                  handleChange={handleChange}
                  value={newUser.password}
                  label={'Password'}
                />
              </div>

              {/* confirm password */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='password'
                  name='confirmPassword'
                  handleChange={handleChange}
                  value={newUser.confirmPassword}
                  label={'Confirm Password'}
                />
              </div>

              {/* Email */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='email'
                  name='email'
                  handleChange={handleChange}
                  value={newUser.email}
                  label={'Email'}
                  disabled={true}
                />
              </div>

              {/* First Name */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='firstName'
                  handleChange={handleChange}
                  value={newUser.firstName}
                  label={'First Name'}
                  disabled={true}
                />
              </div>

              {/* Last Name */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='lastName'
                  handleChange={handleChange}
                  value={newUser.lastName}
                  label={'Last Name'}
                  disabled={true}
                />
              </div>

              {/* End */}
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
                  value={newUser.address}
                  label={'Address'}
                  disabled={true}
                />
              </div>
              {/* Phone Number */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='phoneNumber'
                  handleChange={handleChange}
                  value={newUser.phoneNumber}
                  label={'Phone Number'}
                  disabled={true}
                />
              </div>
              {/* City */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='city'
                  handleChange={handleChange}
                  value={newUser.city}
                  label={'City'}
                  disabled={true}
                />
              </div>
              {/* State */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='state'
                  handleChange={handleChange}
                  value={newUser.state}
                  label={'State'}
                  disabled={true}
                />
              </div>
              {/* Zip */}
              <div className='w-full lg:w-4/12 px-4'>
                <Input
                  type='text'
                  name='zip'
                  handleChange={handleChange}
                  value={newUser.zip}
                  label={'Zip'}
                  disabled={true}
                />
              </div>
              {/* facebook */}
              <div className='w-full lg:w-6/12 px-4'>
                <Input
                  type='text'
                  name='facebook'
                  handleChange={handleChange}
                  value={newUser.facebook}
                  label={'Facebook (Profile Link)'}
                  placeholder={'https://www.facebook.com/'}
                  disabled={true}
                />
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />
            <div className='px-4 mt-6'>
              <button className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                {isCreateUserLoading ? (
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

export default CreateUser;
