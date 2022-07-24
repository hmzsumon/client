import React from 'react';
import Mouse from '../../assets/images/elements/mouse.png';
import icon1 from '../../assets/images/svg-icons/choose-us-icons/1.svg';
import icon2 from '../../assets/images/svg-icons/choose-us-icons/2.svg';
import icon3 from '../../assets/images/svg-icons/choose-us-icons/3.svg';
import icon4 from '../../assets/images/svg-icons/choose-us-icons/4.svg';
import icon5 from '../../assets/images/svg-icons/choose-us-icons/5.svg';
import icon6 from '../../assets/images/svg-icons/choose-us-icons/6.svg';

const WhyChoose = () => {
  return (
    <>
      {/* <!-- choose-us-section start --> */}
      <section className='choose-us-section section-padding'>
        <div className='choose-us-image'>
          <img src={Mouse} alt='' />
        </div>
        <div className=''>
          <div className='row justify-content-center'>
            <div className='col-lg-6'>
              <div className='section-header text-center'>
                <h2 className='section-title text-5xl font-bold text-gray-800'>
                  Why Choose Us?
                </h2>
                <p className='text-gray-700'>
                  Upwork makes playing the world's largest lotteries easy and
                  fun.
                </p>
              </div>
            </div>
          </div>

          <div className='w-fuu md:w-10/12'>
            <div className='grid grid-cols-12 gap-6 px-2 md:px-20'>
              <div className='col-span-12 md:col-span-4 '>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon'>
                      <img src={icon1} alt='icon' />
                    </div>
                    <h4 className='title'>Biggest lottery jackpots</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
              <div className='col-span-12 md:col-span-4'>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon'>
                      <img src={icon2} alt='icon' />
                    </div>
                    <h4 className='title'>No commission on Winnings</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
              <div className='col-span-12 md:col-span-4'>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon'>
                      <img src={icon3} alt='icon' />
                    </div>
                    <h4 className='title'> Safe and Secure Playing</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
              <div className='col-span-12 md:col-span-4'>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon'>
                      <img src={icon4} alt='icon' />
                    </div>
                    <h4 className='title'>Instant payout system</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
              <div className='col-span-12 md:col-span-4'>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon'>
                      <img src={icon5} alt='icon' />
                    </div>
                    <h4 className='title'>Performance Bonuses</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
              <div className='col-span-12 md:col-span-4'>
                <div className='choose-item text-center'>
                  <div className='front'>
                    <div className='icon '>
                      <img src={icon6} alt='icon' />
                    </div>
                    <h4 className='title'>Dedicated Support</h4>
                  </div>
                  <div className='back'>
                    <p>
                      One of the core advantages of playing an online lotto is
                      that it is both safe and secure. So, there is no need for
                      you to queue, or visit a retail store, to get tickets.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- choose-item end --> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- choose-us-section end --> */}
    </>
  );
};

export default WhyChoose;
