import { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import person2 from '../../assets/images/elements/person-2.png';
import { reset, updateTasksLimit } from '../../redux/works/workSlice';
import DashboardLayout from '../layouts/DashboardLayout';

const DailyWorkView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { updatedUser: user } = useSelector((state) => state.auth);

  //work state
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.work
  );

  const [loading, setLoading] = useState(false);

  // handler for daily task
  const handleClick = () => {
    dispatch(updateTasksLimit());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/works');
    }, 2000);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, history, dispatch]);
  return (
    <DashboardLayout>
      {loading ? (
        <div className='flex items-center justify-center'>
          <RingLoader size={100} color={'#fff'} />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center space-y-6 '>
          <div>
            <img src={person2} alt='' />
          </div>

          <button
            className='text-sm font-semibold mx-auto w-7/12 md:w-2/12 py-2 text-white px-4 bg-green-500 rounded-md'
            onClick={() => handleClick()}
          >
            Click And Get
            <div className='text-2xl flex items-center justify-center text-center font-bold text-orange-700 '>
              <span>
                <TbCurrencyTaka />
              </span>
              {user.usrTaskValue}
            </div>
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DailyWorkView;
