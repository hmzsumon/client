import React from 'react';
import HomeLayout from '../components/Home/HomeLayout';
import Lottery1 from '../components/Lotteries/Lottery1';
import Banner from '../components/Reusable/Banner';
import Faq1 from '../components/Reusable/Faq1';

const Lotteries = () => {
  return (
    <HomeLayout>
      <Banner title={'All Lotteries'} />
      <Lottery1 />
      <Faq1 />
    </HomeLayout>
  );
};

export default Lotteries;
