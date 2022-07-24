import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import DashboardCard01 from '../components/dashboard/DashboardCard01';
import DashboardCard02 from '../components/dashboard/DashboardCard02';
import DashboardCard05 from '../components/dashboard/DashboardCard05';
import LuckyBoxCard from '../components/dashboard/LuckyBoxCard';
import Packages from '../components/dashboard/Package/Packages';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { getUpdatedUserDetails } from '../redux/auth/authSlice';
import { getUserLuckyBoxes } from '../redux/ticket/ticketSlice';
import { newUserDailyWorks } from '../redux/works/workSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isGetUserLoading, updatedUser } = useSelector((state) => state.auth);
  const { role } = updatedUser;
  const { luckyBoxCount, isNewUser } = updatedUser;
  const { luckyBoxes } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getUpdatedUserDetails());
    dispatch(getUserLuckyBoxes());
  }, [dispatch]);

  const newUserTask = useCallback(() => {
    dispatch(newUserDailyWorks());
  }, [dispatch]);

  useEffect(() => {
    if (isNewUser) {
      newUserTask();
    }
  }, [newUserTask, isNewUser]);

  return (
    <DashboardLayout>
      {isGetUserLoading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div className=' space-y-6'>
          {/* Welcome banner */}
          <WelcomeBanner />
          {/* Not Active */}
          <div className='grid grid-cols-12 gap-6'>
            {luckyBoxCount > 0 && <LuckyBoxCard luckyBoxes={luckyBoxes} />}
            <DashboardCard01 user={updatedUser} />

            <DashboardCard02 />
            {role === 'user' && <DashboardCard05 />}
          </div>
          {/* Packages */}
          <div>
            <Packages />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default React.memo(Dashboard);
