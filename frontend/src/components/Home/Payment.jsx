import React from 'react';
import payment1 from '../../assets/images/payment-methods/1.jpg';
import payment2 from '../../assets/images/payment-methods/2.jpg';
import payment3 from '../../assets/images/payment-methods/3.jpg';
import payment4 from '../../assets/images/payment-methods/4.jpg';
import payment5 from '../../assets/images/payment-methods/5.jpg';
import cm1 from '../../assets/images/payment-methods/cm1.png';
import cm2 from '../../assets/images/payment-methods/cm2.png';
import cm3 from '../../assets/images/payment-methods/cm3.png';

export const Payment = () => {
  return (
    <div>
      {/* <!-- payment-method-section start --> */}
      <section className='payment-method-section section-padding border-top'>
        <div className='px-4 md:px-20'>
          <div className='row justify-content-center'>
            <div className='col-lg-6'>
              <div className='section-header text-center'>
                <h2 className='section-title text-5xl text-gray-800 font-bold'>
                  Payment Method
                </h2>
                <p>
                  Buy international lottery tickets online using any of the
                  payment methods available on Upwok Play now and win big!
                </p>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div className='payment-method-area d-flex'>
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment1} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment2} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment3} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment4} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment5} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
                <div className='payment-item'>
                  <a href='#0'>
                    <img src={payment1} alt='payment-method' />
                  </a>
                </div>
                {/* <!-- payment-item end --> */}
              </div>
            </div>
            <div className=''>
              <div className='commission-area md:flex align-items-center'>
                <div className='title-area'>
                  <h3 className='title'>Referral commission</h3>
                </div>
                <div className='commission-items-wrapper  flex align-items-center'>
                  <div className='commission-items flex flex-col  align-items-center'>
                    <div className='icon'>
                      <img src={cm1} alt='cm-icon' />
                    </div>
                    <div className='content'>
                      <span className='percentage'>10%</span>
                      <p>1st Level</p>
                    </div>
                  </div>
                  {/* <!-- commission-items end --> */}
                  <div className='commission-items flex flex-col  align-items-center'>
                    <div className='icon'>
                      <img src={cm2} alt='cm-icon' />
                    </div>
                    <div className='content'>
                      <span className='percentage'>05%</span>
                      <p>2nd Level</p>
                    </div>
                  </div>
                  {/* <!-- commission-items end --> */}
                  <div className='commission-items flex flex-col align-items-center'>
                    <div className='icon'>
                      <img src={cm3} alt='cm-icon' />
                    </div>
                    <div className='content'>
                      <span className='percentage'>03%</span>
                      <p>3rd Level</p>
                    </div>
                  </div>
                  {/* <!-- commission-items end --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- payment-method-section end --> */}
    </div>
  );
};
