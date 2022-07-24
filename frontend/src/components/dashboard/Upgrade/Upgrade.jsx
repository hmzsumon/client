import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { reset, upgradePackage } from '../../../redux/package/packageSlice';
import Input from '../../Reusable/Input';
import Packages from '../Package/Packages';

const Upgrade = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, isUpgrade, message, isError } = useSelector(
    (state) => state.package
  );
  const [amount, setAmount] = React.useState(0);
  // handle upgrade
  const handleUpgrade = () => {
    if (amount) {
      const myForm = new FormData();
      myForm.set('amount', amount);
      dispatch(upgradePackage(myForm));
    } else {
      toast.error('Please enter amount.');
    }
  };
  // handle change
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (isUpgrade) {
      toast.success(message);
      setTimeout(() => {
        history.push('/dashboard');
      }, 600);
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isUpgrade, isError, message, dispatch]);

  return (
    <DashboardLayout>
      <h1 className=' my-4'>Upgrade Your Package</h1>

      <div>
        <div>
          <Input
            type='number'
            handleChange={handleChange}
            name='amount'
            value={amount}
            label={'Please Enter Amount'}
          />

          <button
            className='bg-green-500 px-4 py-2 text-white rounded uppercase mb-1'
            onClick={handleUpgrade}
          >
            {isLoading ? 'Loading...' : 'Upgrade'}
          </button>
        </div>
        <div>
          <h2 className='text-center text-sm text-gray-800'>
            -- Or Select a Package --
          </h2>
        </div>
        <div>
          <Packages />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upgrade;
