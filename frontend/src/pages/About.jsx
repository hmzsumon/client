import React from 'react';
import About1 from '../components/About/About1';
import Why from '../components/About/Why';
import HomeLayout from '../components/Home/HomeLayout';
import Team from '../components/Home/Team';
import Banner from '../components/Reusable/Banner';

const About = () => {
  return (
    <HomeLayout>
      <Banner title={'About Us'} />
      <About1 />
      <Why />
      <Team />
    </HomeLayout>
  );
};

export default About;
