import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomeLayout from '../components/Home/HomeLayout';
import { register, reset } from '../redux/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const referCode = useLocation().search.split('=')[1];
  console.log(referCode);

  const initialValues = {
    userName: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    referCode: referCode,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [inputErrors, setInputErrors] = useState({});

  const [phone, setPhone] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle change
    if (name === 'userName') {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase().trim(),
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('data', formValues);
    setInputErrors(validate(formValues));
    if (Object.keys(inputErrors).length === 0) {
      const userData = {
        userName: formValues.userName,
        password: formValues.password,
        fullName: formValues.fullName,
        phoneNumber: phone,
        referCode: formValues.referCode,
      };

      dispatch(register(userData));
    } else {
      toast.error('Please fill the required fields');
    }
  };

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      console.log('success', message);
      history.push('/dashboard');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, history]);

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = 'User Name is Required';
    } else if (!/^[a-zA-Z0-9]+$/.test(values.userName)) {
      errors.userName = 'User Name is Invalid';
      console.log(values.userName);
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Password does not match';
    }

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
    if (!values.referCode) {
      errors.referCode = 'Refer Code is required';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    }

    return errors;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeLayout>
      <div className='h-full px-4 py-10 md:px-20'>
        <div className=' flex space-x-2 text-[#0E75BB] text-xl md:text-3xl font-bold border-b border-[#0E75BB]'>
          <FaUserPlus />
          <h1>REGISTER AT E-Group Work</h1>
        </div>
        <div className='p-4 mt-6 border md:p-10'>
          <form className='w-full ' onSubmit={handleSubmit}>
            {/* Start User name */}
            <div className='flex flex-wrap mb-6 -mx-3'>
              <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                <label
                  className={`block mb-2 ${
                    inputErrors.userName && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-password'
                >
                  User Name:
                </label>
                <input
                  className={`block w-full  px-4 py-3  leading-tight text-gray-700 bg-gray-200 border  rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 ${
                    inputErrors.userName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  id='grid-password'
                  name='userName'
                  type='text'
                  placeholder=' e.g. johnsmith'
                  value={formValues.userName}
                  onChange={handleChange}
                />
                <p className='text-xs italic text-red-500'>
                  {inputErrors.userName}
                </p>
              </div>
              {/* Name */}
              <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                <label
                  className={`block mb-2 ${
                    inputErrors.fullName && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-first-name'
                >
                  Full Name:
                </label>
                <input
                  className={`appearance-none block w-full ${
                    inputErrors.fullName && 'border-red-500'
                  }  bg-gray-200 text-gray-700 border rounded  py-3 px-4  leading-tight  focus:outline-none focus:bg-white'
                            id='grid-first-name`}
                  name='fullName'
                  type='text'
                  value={inputErrors.fullName}
                  placeholder='e.g. John'
                  onChange={handleChange}
                />

                <p className='text-xs italic text-red-500'>
                  {inputErrors.fullName}
                </p>
              </div>
            </div>
            {/* End User name */}

            {/* Start Password */}
            <div className='flex flex-wrap mb-6 -mx-3'>
              <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                <label
                  className={`block mb-2 ${
                    inputErrors.password && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-first-name'
                >
                  Password:
                </label>
                <input
                  className={`appearance-none block w-full ${
                    inputErrors.password && 'border-red-500'
                  }  bg-gray-200 text-gray-700 border rounded  py-3 px-4 leading-tight  focus:outline-none focus:bg-white'
                            id='grid-first-name`}
                  name='password'
                  type='password'
                  value={formValues.password}
                  onChange={handleChange}
                />

                <p className='text-xs italic text-red-500'>
                  {inputErrors.password}
                </p>
              </div>
              <div className='w-full px-3 md:w-1/2'>
                <label
                  className={`block mb-2 ${
                    inputErrors.confirmPassword && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-last-name'
                >
                  Confirm Password:
                </label>
                <input
                  className={`appearance-none block w-full ${
                    inputErrors.confirmPassword ? 'border-red-500' : null
                  } rounded bg-gray-200 text-gray-700 border  py-3 px-4  leading-tight  focus:outline-none focus:bg-white'
                            id='grid-first-name`}
                  name='confirmPassword'
                  id='grid-last-name'
                  type='password'
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
                <p className='text-xs italic text-red-500'>
                  {inputErrors.confirmPassword}
                </p>
              </div>
            </div>
            {/* End Password */}

            {/* Start Phone & Refer Code */}
            <div className='flex flex-wrap mb-6 -mx-3'>
              <div className='w-full px-3 md:w-1/2'>
                <label
                  className={`block mb-2 ${
                    inputErrors.phone && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-last-name'
                >
                  Phone:
                </label>

                <PhoneInput
                  className={`phone-input ${inputErrors.phone && 'error'}`}
                  international
                  defaultCountry='BD'
                  value={phone}
                  onChange={setPhone}
                />

                <p className='text-xs italic text-red-500'>
                  {inputErrors.phone}
                </p>
              </div>
              <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                <label
                  className={`block mb-2 ${
                    inputErrors.email && 'text-red-500'
                  } text-xs font-bold tracking-wide text-gray-700 uppercase`}
                  htmlFor='grid-first-name'
                >
                  Refer Code:
                </label>
                <input
                  className={`appearance-none block w-full  disabled:cursor-not-allowed ${
                    inputErrors.email && 'border-red-500'
                  }  bg-gray-200 text-gray-700 border rounded  py-3 px-4  leading-tight  focus:outline-none focus:bg-white'
                            id='grid-first-name`}
                  name='referCode'
                  type='text'
                  value={formValues.referCode}
                  placeholder='e.g. example@gmail.com'
                  onChange={handleChange}
                  disabled
                />

                <p className='text-xs italic text-red-500'>
                  {inputErrors.referCode}
                </p>
              </div>
            </div>
            {/* End Phone & refer */}

            <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
              <button
                type='submit'
                className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Register;

//   /* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */
