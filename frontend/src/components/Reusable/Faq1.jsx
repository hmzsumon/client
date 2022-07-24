import React from 'react';
import img1 from '../../assets/images/elements/faq.png';

const Faq1 = () => {
  return (
    <div>
      {/* <!-- question-section start --> */}
      <section class='question-section section-padding section-bg border-top'>
        <div class='px-4 md:px-20'>
          <div class='grid grid-cols-12 items-center justify-center'>
            <div class='col-span-12 md:col-span-4'>
              <div class='thumb text-lg-right text-center'>
                <img src={img1} alt='FAQ' class='mx-auto' />
              </div>
            </div>
            <div class='col-span-12 md:col-span-8'>
              <div class='content'>
                <h2 class='title text-3xl font-bold md:text-5xl text-gray-700'>
                  If you have any questions
                </h2>
                <p className='text-gray-700'>
                  Our top priorities are to protect your privacy, provide secure
                  transactions, and safeguard your data. When you're ready to
                  play, registering an account is required so we know you're of
                  legal age and so no one else can use your account.We answer
                  the most commonly asked lotto questions..
                </p>
                <a href='#0' class='cmn-btn'>
                  Check FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- question-section end --> */}
    </div>
  );
};

export default Faq1;
