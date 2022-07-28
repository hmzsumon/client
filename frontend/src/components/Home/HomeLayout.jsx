import React from 'react';
import MainNav from '../header/MainNav';

const HomeLayout = ({ children }) => {
  return (
    <>
      <MainNav />
      <div className='pt-[70px]'>{children}</div>
      {/* <Footer1 /> */}
    </>
  );
};

export default HomeLayout;
