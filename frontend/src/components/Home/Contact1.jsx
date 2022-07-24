import React from 'react';
import Image1 from '../../assets/images/elements/contact.png';

const Contact1 = () => {
  return (
    <div>
      {/* <!-- contact-section start --> */}
      <section
        class='contact-section border-top overflow-hidden has_bg_image'
        data-background='assets/images/bg-three.jpg'
      >
        <div class='flex items-center justify-center px-6 w-10/12 mx-auto'>
          <div class=' grid grid-cols-12  gap-14'>
            <div class='col-span-12 md:col-span-6'>
              <div class='section-header text-center'>
                <h5 class='top-title text-2xl text-gray-800 font-bold'>
                  We answer all of your questions
                </h5>
                <h2 class='section-title text-uppercase text-5xl text-gray-800 font-bold'>
                  Contact us
                </h2>
                <p>
                  If you have any questions or queries our helpful support team
                  will be more than happy to assist.
                </p>
              </div>
              <div class='contact-form-area w-full'>
                <form class='contact-form'>
                  <div class='form-grp'>
                    <input
                      type='text'
                      name='contact_name'
                      id='contact_name'
                      placeholder='Full Name'
                    />
                  </div>
                  <div class='form-grp'>
                    <input
                      type='email'
                      name='contact_email'
                      id='contact_email'
                      placeholder='Email Address'
                    />
                  </div>
                  <div class='form-grp'>
                    <input
                      type='tel'
                      name='contact_phone'
                      id='contact_phone'
                      placeholder='Phone No'
                    />
                  </div>
                  <div class='form-grp'>
                    <textarea
                      name='contact_message'
                      id='contact_message'
                      placeholder='Message'
                    ></textarea>
                  </div>
                  <div class='form-grp'>
                    <input
                      class='submit-btn'
                      type='submit'
                      value='sent message'
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class=' hidden md:block col-span-12 md:col-span-5'>
              <div class='contact-thumb'>
                <img src={Image1} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- contact-section end --> */}
    </div>
  );
};

export default Contact1;
