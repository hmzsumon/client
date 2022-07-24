import React from 'react';
import img1 from '../../assets/images/about-image.jpg';

const About1 = () => {
  return (
    <div>
      {/* <!-- about-section start --> */}
      <section class='about-section section-padding'>
        <div class='container-fluid'>
          <div class='grid space-y-10 md:space-y-0 grid-cols-12 md:gap-20 px-4 md:px-0 justify-content-between'>
            <div class='col-span-12 md:col-span-5'>
              <div class='thumb'>
                <img src={img1} alt='' />
              </div>
            </div>
            <div class='col-span-12 md:col-span-7 md:pl-14 '>
              <div class='content mx-auto '>
                <h2 class='title text-2xl md:text-5xl text-gray-700 font-bold'>
                  A FEW WORDS ABOUT US
                </h2>
                <p className='text-gray-700'>
                  Our goal is to provide our customers with the most convenient
                  and enjoyable lottery purchasing experience.
                </p>
                <p className='text-gray-700'>
                  It’s not just what we do, it’s who we are. From past to
                  present, we are a success story still in the making.With an
                  enthusiasm to serve, our commitment to providing fun and fair
                  games is matched by our desire to make a positive difference
                  in the community.
                </p>
                <ul class='cmn-list'>
                  <li>Playing It Global for Over a Decade</li>
                  <li>Play from Anywhere in the World</li>
                  <li>Absolutely No Commissions Taken</li>
                  <li>A Simple and Secure Service</li>
                  <li>Winning Made Easy</li>
                </ul>
                <a href='#0' class='cmn-btn'>
                  a bit of history
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- about-section end --> */}
    </div>
  );
};

export default About1;
