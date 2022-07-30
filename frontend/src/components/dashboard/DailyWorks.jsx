import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import ops from '../../assets/images/elements/oops.png';
import { getDailyWorks } from '../../redux/works/workSlice';

import DashboardLayout from '../layouts/DashboardLayout';
import DailyWork from './DailyWork';
import NotActiveCard from './NotActiveCard';

const DailyWorks = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isGetUserLoading, updatedUser } = useSelector((state) => state.auth);
  const { dailyWorks } = useSelector((state) => state.work);

  const { tasksLimit, userHasPackage, usrTaskValue, isCompleted } = updatedUser;
  console.log(tasksLimit);

  useEffect(() => {
    if (userHasPackage === false) {
      toast.error('You have no package!', {
        position: 'top-center',
      });
    } else if (isCompleted || tasksLimit === 0) {
      toast.success('You have completed all your tasks!');
      return;
    }
    dispatch(getDailyWorks());
  }, [dispatch, isCompleted, userHasPackage, tasksLimit]);

  return (
    <DashboardLayout>
      {updatedUser.status === 'inactive' ? (
        <NotActiveCard />
      ) : (
        <>
          {isGetUserLoading ? (
            <div className='flex items-center justify-center'>
              <RingLoader size={100} color={'#fff'} />
            </div>
          ) : (
            <>
              {isCompleted || tasksLimit === 0 ? (
                <div>
                  <div className='px-6 w-full text-center '>
                    <h2 className='text-xl font-semibold text-red-700'>
                      No Daily Task
                    </h2>
                    <div className='flex items-center  mx-auto justify-center'>
                      <img src={ops} alt='' className='w-60' />
                    </div>

                    <NavLink to='/dashboard' className='text-blue-500'>
                      <u>Go Back</u>
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <h2 className='text-gray-800 text-xl font-medium'>
                    Total Tasks: {tasksLimit}
                  </h2>
                  <div className='grid grid-cols-12 gap-6'>
                    {dailyWorks &&
                      dailyWorks.map((task, index) => {
                        return (
                          <DailyWork
                            key={index}
                            task={task}
                            taskValue={usrTaskValue}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default DailyWorks;
