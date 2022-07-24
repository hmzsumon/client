import React from 'react';
import icon1 from '../../assets/images/svg-icons/affiliate-icons/1.svg';
import icon2 from '../../assets/images/svg-icons/affiliate-icons/2.svg';
import icon3 from '../../assets/images/svg-icons/affiliate-icons/3.svg';
import icon4 from '../../assets/images/svg-icons/affiliate-icons/4.svg';

const Affiliate = () => {
  return (
    <div>
      {/* <!-- affiliate-section start --> */}
      <section className='affiliate-section section-padding'>
        <div className=''>
          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='section-header text-center'>
                <h2 className='section-title  text-5xl text-gray-800 font-bold'>
                  Affiliate Programs
                </h2>
                <p className='text-gray-700 w-7/12 mx-auto'>
                  Tell A Friend is our unique lottery friends promotion club
                  that enables you to earn amazing bonus money rewards for
                  inviting friends to play the world’s biggest jackpots!
                </p>
              </div>
            </div>
          </div>
          <div className=' m-bottom-not-30 gap-6 grid grid-cols-12 px-4 md:px-28'>
            <div className='md:col-span-3 col-span-12 sm:col-span-6'>
              <div className='affiliate-item text-center'>
                <div className='icon'>
                  <div className='icon-inner'>
                    <img src={icon1} alt='icon' />
                  </div>
                </div>
                <div className='content'>
                  <h4 className='title'>High Revenues</h4>
                  <p>
                    We offer the best commissions in the market and provide
                    proven.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- affiliate-item end --> */}
            <div className='md:col-span-3 col-span-12 sm:col-span-6'>
              <div className='affiliate-item text-center'>
                <div className='icon'>
                  <div className='icon-inner'>
                    <img src={icon2} alt='icon' />
                  </div>
                </div>
                <div className='content'>
                  <h4 className='title'>Reliable Payments</h4>
                  <p>
                    Payments are made monthly via a variety of payment methods.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- affiliate-item end --> */}
            <div className='md:col-span-3 col-span-12 sm:col-span-6'>
              <div className='affiliate-item text-center'>
                <div className='icon'>
                  <div className='icon-inner'>
                    <img src={icon3} alt='icon' />
                  </div>
                </div>
                <div className='content'>
                  <h4 className='title'>Unlimited Affiliates</h4>
                  <p>
                    Thee is no limit for your number of affiliates and no
                    earning limit.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- affiliate-item end --> */}
            <div className='md:col-span-3 col-span-12 sm:col-span-6'>
              <div className='affiliate-item text-center'>
                <div className='icon'>
                  <div className='icon-inner'>
                    <img src={icon4} alt='icon' />
                  </div>
                </div>
                <div className='content'>
                  <h4 className='title'>Dedicated Support</h4>
                  <p>
                    Our dedicated technical support team works with you to
                    understand and identify
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- affiliate-item end --> */}
          </div>
        </div>
      </section>
      {/* <!-- affiliate-section end --> */}
    </div>
  );
};

export default Affiliate;
