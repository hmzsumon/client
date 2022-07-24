import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { useDate } from '../../utils/useDate';

function WelcomeBanner() {
  const { updatedUser: user, isLoading } = useSelector((state) => state.auth);

  const { wish } = useDate();

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div className='relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8'>
          {/* Background illustration */}
          <div
            className='absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block'
            aria-hidden='true'
          >
            <svg
              width='319'
              height='198'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <defs>
                <path id='welcome-a' d='M64 0l64 128-64-20-64 20z' />
                <path id='welcome-e' d='M40 0l40 80-40-12.5L0 80z' />
                <path id='welcome-g' d='M40 0l40 80-40-12.5L0 80z' />
                <linearGradient
                  x1='50%'
                  y1='0%'
                  x2='50%'
                  y2='100%'
                  id='welcome-b'
                >
                  <stop stopColor='#A5B4FC' offset='0%' />
                  <stop stopColor='#818CF8' offset='100%' />
                </linearGradient>
                <linearGradient
                  x1='50%'
                  y1='24.537%'
                  x2='50%'
                  y2='100%'
                  id='welcome-c'
                >
                  <stop stopColor='#4338CA' offset='0%' />
                  <stop stopColor='#6366F1' stopOpacity='0' offset='100%' />
                </linearGradient>
              </defs>
              <g fill='none' fillRule='evenodd'>
                <g transform='rotate(64 36.592 105.604)'>
                  <mask id='welcome-d' fill='#fff'>
                    <use xlinkHref='#welcome-a' />
                  </mask>
                  <use fill='url(#welcome-b)' xlinkHref='#welcome-a' />
                  <path
                    fill='url(#welcome-c)'
                    mask='url(#welcome-d)'
                    d='M64-24h80v152H64z'
                  />
                </g>
                <g transform='rotate(-51 91.324 -105.372)'>
                  <mask id='welcome-f' fill='#fff'>
                    <use xlinkHref='#welcome-e' />
                  </mask>
                  <use fill='url(#welcome-b)' xlinkHref='#welcome-e' />
                  <path
                    fill='url(#welcome-c)'
                    mask='url(#welcome-f)'
                    d='M40.333-15.147h50v95h-50z'
                  />
                </g>
                <g transform='rotate(44 61.546 392.623)'>
                  <mask id='welcome-h' fill='#fff'>
                    <use xlinkHref='#welcome-g' />
                  </mask>
                  <use fill='url(#welcome-b)' xlinkHref='#welcome-g' />
                  <path
                    fill='url(#welcome-c)'
                    mask='url(#welcome-h)'
                    d='M40.333-15.147h50v95h-50z'
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className='relative grid grid-cols-12 '>
            <div className='col-span-12 md:col-span-6'>
              <div>
                <img
                  src='./images/up-logo.png'
                  alt='Logo'
                  className=' w-20 h-auto mb-4'
                />
              </div>
              <h1 className='text-2xl md:text-3xl text-slate-800 font-bold mb-1'>
                {wish} {user && user.fullName} 👋
              </h1>
            </div>
            <div className='flex items-center justify-between w-full col-span-12 md:col-span-6'>
              <div className='capitalize text-xl space-x-2 font-semibold flex'>
                <p
                  className={`${
                    user.status === 'active' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user.status}
                </p>
                <p>{user.role}</p>
              </div>
              {/* <div>
                {user.role === 'user' && user.isAgent === false && (
                  <NavLink
                    to='/apply-agent'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Apply For Agent
                  </NavLink>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomeBanner;
