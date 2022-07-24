import { PulseLoader } from 'react-spinners';

const Settings = ({ user, handleChange, submitForm, loading }) => {
  const {
    userName,
    city,
    state,
    zip,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
    fullName,
  } = user;

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-gray-700 text-xl font-bold'>My account</h6>
            <button
              className='bg-blue-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Settings
            </button>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          {/* edit form */}
          <form onSubmit={submitForm}>
            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              {fullName} Information
            </h6>
            <div className='flex flex-wrap'>
              {/* User name */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    name='userName'
                    value={userName}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none cursor-not-alow focus:ring w-full ease-linear transition-all duration-150 disabled:cursor-not-allowed'
                    disabled
                  />
                </div>
              </div>

              {/* Email */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* First name */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 cursor-not-allowed'
                    disabled
                  />
                </div>
              </div>
              {/* Last name */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-400 bg-white rounded text-sm shadow focus:outline-none cursor-not-allowed focus:ring w-full ease-linear transition-all duration-150'
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />

            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Contact Information
            </h6>
            <div className='flex flex-wrap'>
              {/* Address */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    value={address}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* City */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={city}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* State */}
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    value={state}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* Zip */}
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Postal Code
                  </label>
                  <input
                    type='text'
                    name='zip'
                    value={zip}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Phone Number
                  </label>
                  <input
                    type='text'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={handleChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
            </div>

            <hr className='mt-6 border-b-1 border-gray-300' />
            <div className='px-4 mt-6'>
              <button className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                {loading ? (
                  <PulseLoader color={'#fff'} size={10} />
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
