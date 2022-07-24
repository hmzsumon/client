import React from 'react';
import MainNav from '../header/MainNav';
import Footer1 from '../Home/Footer1';

const HomeLayout = ({ children }) => {
  return (
    <>
      <MainNav />
      <div className='pt-[70px]'>{children}</div>
      <Footer1 />
    </>
  );
};

export default HomeLayout;
