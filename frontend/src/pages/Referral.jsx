import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { getUpdatedUserDetails } from '../redux/auth/authSlice';

const Referral = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { updatedUser } = useSelector((state) => state.auth);

  const [Generate, setGenerate] = useState(false);

  const [link, setLink] = useState('');
  const [placement, setPlacement] = useState('');
  const [placementError, setPlacementError] = useState(false);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleGenerate = () => {
    setPlacementError(false);
    setGenerate(true);
    setLink(`${window.location.origin}/register?referCode=${updatedUser._id}`);
  };

  useEffect(() => {
    if (updatedUser.status === 'inactive') {
      toast.error('Please activate your account to generate referral link');
      history.goBack();
    }
  }, [updatedUser, history]);

  useEffect(() => {
    dispatch(getUpdatedUserDetails());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className='space-y-4'>
        {/* Select Placement */}

        {/* Btn */}
        <div className='text-center my-5'>
          <button
            onClick={handleGenerate}
            className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Generate Referral Link
          </button>
        </div>
        {/* Referral Link */}
        {Generate && (
          <div>
            <p className='text-center md:text-left text-gray-800 font-medium'>
              {' '}
              Your Referral Link: {link}{' '}
            </p>
            <p className='text-sm text-center md:text-left font-bold mt-4 text-blue-500'>
              Please copy the link and share it with your friends.
            </p>
            <div className='text-center my-5'>
              <CopyToClipboard
                text={link}
                onCopy={() => setCopied({ copied: true })}
              >
                <button
                  className={`${
                    copied ? 'bg-blue-500 ' : ''
                  }text-sm font-bold  border mx-auto w-40 border-blue-500 rounded p-2 transition`}
                  onClick={copyToClipboard}
                >
                  <span
                    className={`${copied ? 'text-white' : 'text-gray-800'}`}
                  >
                    {copied ? 'Copied' : 'Click to Copy'}
                  </span>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Referral;
