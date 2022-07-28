import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import HomeLayout from '../components/Home/HomeLayout';
import { login, reset } from '../redux/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const initialValues = {
    userName: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [inputErrors, setInputErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const {
    updatedUser: user,
    isLoading,
    isAuthenticated,
    isError,
    isSuccess,
    message,
    referId,
  } = useSelector((state) => state.auth);
  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  // user status is suspended
  useEffect(() => {
    if (user && user.status === 'suspended') {
      toast.error('Your account has been suspended');
      history.push('/suspend');
    }
  }, [user, history]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isAuthenticated && user) {
      history.push(redirect);
    }

    if (isSuccess) {
      history.push(redirect);
    }

    dispatch(reset());
  }, [
    user,
    isError,
    isSuccess,
    message,
    dispatch,
    history,
    redirect,
    isAuthenticated,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors(validate(formValues));

    if (Object.keys(inputErrors).length === 0) {
      dispatch(login(formValues));
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <RingLoader color={'#36D7B7'} size={100} />
      </div>
    );
  }

  return (
    <HomeLayout>
      <div className='flex items-center justify-center w-full h-screen px-4 '>
        <div className='w-full max-w-[500px] h-auto rounded border '>
          <div className='bg-[#0E75BB] w-full max-w-[500px] rounded-t py-6 px-4  '>
            <h1 className='text-3xl font-bold text-white'>Login</h1>
          </div>
          <form className='my-6' onSubmit={handleSubmit}>
            <div className='w-full px-3 space-y-4'>
              <input
                className={`block w-full ${
                  inputErrors.userName &&
                  'border-red-500 placeholder:text-red-500'
                }  px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                id='grid-password'
                name='userName'
                type='text'
                placeholder='User Name'
                value={formValues.userName}
                onChange={handleChange}
              />
              <p className='text-xs italic text-red-500'>
                {inputErrors.userName}
              </p>

              <div className='flex relative'>
                <input
                  className={`block w-full ${
                    inputErrors.password &&
                    'border-red-500 placeholder:text-red-500'
                  }  px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                  name='password'
                  type={passwordShown ? 'text' : 'password'}
                  placeholder='Password'
                  value={formValues.password}
                  onChange={handleChange}
                />
                <span
                  onClick={togglePassword}
                  className=' text-2xl absolute right-3 top-[28%]'
                >
                  {passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <p className='text-xs italic text-red-500'>
                {inputErrors.password}
              </p>
            </div>
            <div className='flex items-center justify-between w-full px-3 my-6'>
              <button
                type='submit'
                className='inline-flex justify-center px-4 py-2 font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm text-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Login
              </button>
              <Link to={`/register?refer_id=${referId}&place=a`}>
                <span className='text-sm md:text-xl font-medium text-blue-600 hover:underline hover:text-blue-700'>
                  Not a member? Sign Up
                </span>
              </Link>
            </div>
          </form>
          <div className='bg-gray-200 text-right w-fuu max-w-[500px] rounded-b border-t border-gray-300 py-3 px-4  '>
            <Link to='/'>
              <span className='text-lg font-semibold text-blue-500 hover:underline hover:text-blue-700'>
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Login;
