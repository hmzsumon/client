import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  getUpdatedUserDetails,
  reset,
  updatePassword,
  updateProfile,
} from '../../../redux/auth/authSlice';
import PasswordInfo from '../../dashboard/PasswordInfo';

import Settings from '../../dashboard/Settings';
import DashboardLayout from '../../layouts/DashboardLayout';

const Profile = () => {
  const dispatch = useDispatch();
  const {
    updatedUser,
    isGetUserLoading,
    isUpdateProfileLoading,
    isUpdateProfileSuccess,
    isUpdateProfileError,
    updateProfileMessage,
    isUpdatePasswordLoading,
    isUpdatePasswordSuccess,
    isUpdatePasswordError,
    updatePasswordMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUpdatedUserDetails());
  }, [dispatch]);

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
  } = updatedUser;

  const [user, setUser] = useState({
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
  });

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // handle Change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  // submit form function
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateProfile(user));
  };

  useEffect(() => {
    if (isUpdateProfileError) {
      toast.error(updateProfileMessage);
    }
    if (isUpdateProfileSuccess) {
      toast.success(updateProfileMessage);
    }
    dispatch(reset());
    return () => {
      dispatch(reset());
    };
  }, [
    isUpdateProfileSuccess,
    isUpdateProfileError,
    updateProfileMessage,
    dispatch,
  ]);

  // handle submit password chang
  const submitPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword(password));
  };

  useEffect(() => {
    if (isUpdatePasswordError) {
      toast.error(updatePasswordMessage);
    }
    if (isUpdatePasswordSuccess) {
      toast.success(updatePasswordMessage);
    }
    dispatch(reset());
  }, [
    isUpdatePasswordError,
    isUpdatePasswordSuccess,
    updatePasswordMessage,
    dispatch,
  ]);

  return (
    <DashboardLayout>
      {isGetUserLoading ? (
        <div className='flex items-center h-screen justify-center'>
          <RingLoader size={100} color={'#FF6C37'} />
        </div>
      ) : (
        <div className=''>
          <Settings
            user={user}
            handleChange={handleChange}
            submitForm={submitForm}
            loading={isUpdateProfileLoading}
          />
          <PasswordInfo
            password={password}
            handlePasswordChange={handlePasswordChange}
            submitPassword={submitPassword}
            loading={isUpdatePasswordLoading}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
