import React from 'react';
import Affiliate from '../components/Home/Affiliate';
import Banner from '../components/Home/Banner';
import HomeLayout from '../components/Home/HomeLayout';
import HowItWorks from '../components/Home/HowItWorks';
import Jackpot from '../components/Home/Jackpot';
// import LotteryResult from '../components/Home/LotteryResult';
import OnlineTicket from '../components/Home/OnlineTicket';
import { Payment } from '../components/Home/Payment';
import Team from '../components/Home/Team';
import WhyChoose from '../components/Home/WhyChoose';

const Home = () => {
  return (
    <HomeLayout className=''>
      <Banner />
      <Jackpot />
      {/* <LotteryResult /> */}
      <WhyChoose />
      <HowItWorks />
      <OnlineTicket />
      <Affiliate />
      <Payment />
      <Team />

      {/* <Contact1 /> */}
    </HomeLayout>
  );
};

export default Home;
