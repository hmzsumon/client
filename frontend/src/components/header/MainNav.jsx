import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  console.log(path);

  const { referId } = useSelector((state) => state.auth);

  return (
    <header className='relative'>
      <nav className='px-4 fixed w-full py-2 bg-gray-100  flex items-center justify-between shadow-md '>
        <NavLink to='/' className='flex items-center'>
          <img src='images/up-logo.png' alt='Up' width={100} />
        </NavLink>

        <div className='space-x-3 text-lg font-medium uppercase '>
          {path === 'register' ? (
            <NavLink to={`/`}>
              <span className='bg-[#62A642]  text-white px-4 py-1 rounded'>
                Log in
              </span>
            </NavLink>
          ) : (
            <NavLink to={`/register?refer_id=${referId}&place=a`}>
              <span className='bg-[#62A642]  text-white px-4 py-1 rounded'>
                Join
              </span>
            </NavLink>
          )}
        </div>
        {/* <div className='md:hidden'>
          <button className='toggler-menu' onClick={handleClick}>
            <div className={click ? 'active' : ''}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div> */}
      </nav>
      {/* Mobile Menu */}
    </header>
  );
};

export default MainNav;
