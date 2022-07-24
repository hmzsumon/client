import { useHistory } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const Cmp = () => {
  const history = useHistory();
  return (
    <DashboardLayout>
      <div
        className='
    flex
    items-center
    justify-center
    w-full
    h-screen
    bg-gradient-to-r
    from-indigo-600
    to-blue-400
    px-2
  '
      >
        <div className=' px-4 md:px-40 py-20 bg-white rounded-md shadow-xl'>
          <div className='flex flex-col items-center'>
            <img src='../images/up-logo.png' alt='' />

            <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              <span className='text-blue-600 text-3xl'>CMP</span> Coming soon
            </h6>

            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              The page you’re looking for doesn’t exist.
            </p>

            <button
              className='px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100'
              onClick={() => history.goBack()}
            >
              &#8592; Go Back
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cmp;
