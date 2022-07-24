import { PulseLoader } from 'react-spinners';

const PasswordInfo = ({
  password,
  handlePasswordChange,
  submitPassword,
  loading,
}) => {
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-gray-700 text-xl font-bold'>Update Password</h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          {/* edit form */}
          <form onSubmit={submitPassword}>
            <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Password information
            </h6>
            <div className='flex flex-wrap'>
              {/* Current Password */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Current Password
                  </label>
                  <input
                    type='password'
                    name='oldPassword'
                    value={password.oldPassword}
                    onChange={handlePasswordChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>

              {/* New Password */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='newPassword'
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    className='border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  />
                </div>
              </div>
              {/* Confirm Password */}
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
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

export default PasswordInfo;
