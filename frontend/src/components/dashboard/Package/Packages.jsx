import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  buyPackage,
  getAllPackages,
  reset,
  upgradePackage,
} from '../../../redux/package/packageSlice';
import Package from './Package';

const Packages = () => {
  const dispatch = useDispatch();
  const { updatedUser: user } = useSelector((state) => state.auth);
  const { isLoading, packages, isBuyError, isBuying, isBuyLoading } =
    useSelector((state) => state.package);

  // get getAllPackages
  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  const handleBuy = (item) => {
    if (user) {
      if (user.creditBalance >= item.price) {
        console.log('item', item);
        if (!isBuyLoading) {
          dispatch(buyPackage(item._id));
        }
      } else {
        toast.error('You have not enough balance to buy this package.');
      }
    } else {
      toast.error('You must login first.');
    }
  };

  // handle Upgrade
  const handleUpgrade = (item) => {
    if (user) {
      if (user.creditBalance >= item.price) {
        const myForm = new FormData();
        myForm.set('amount', item.price);
        dispatch(upgradePackage(myForm));
      } else {
        toast.error('You have not enough balance to buy this package.');
      }
    } else {
      toast.error('You must login first.');
    }

    console.log('UpGrade', item);
  };

  useEffect(() => {
    if (isBuyError) {
      toast.error('Something went wrong.');
    }
    if (isBuying) {
      toast.success('Package bought successfully.');
    }
    dispatch(reset());
  }, [isBuyError, isBuying, dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div className=''>
          <h2 className='my-2 text-2xl font-semibold text-gear'>Packages</h2>
          {/* Not Active */}
          {isBuyLoading ? (
            <div className='flex items-center justify-center w-full h-screen'>
              <RingLoader color={'#36D7B7'} size={100} />
            </div>
          ) : (
            <div className='grid grid-cols-12 gap-6'>
              {packages &&
                packages.map((item) => (
                  <Package
                    key={item._id}
                    item={item}
                    handleBuy={handleBuy}
                    handleUpgrade={handleUpgrade}
                    user={user}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Packages;
