import React from 'react';
import Contact3 from '../components/Contact/Contact3';
import HomeLayout from '../components/Home/HomeLayout';
import Banner from '../components/Reusable/Banner';

const Contact = () => {
  return (
    <HomeLayout>
      <Banner title={'Contact'} />
      <Contact3 />
    </HomeLayout>
  );
};

export default Contact;
