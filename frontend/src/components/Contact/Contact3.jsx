import { BsEnvelope } from 'react-icons/bs';

const Contact3 = () => {
  return (
    <div>
      {/* <!-- contact-section start --> */}
      <section className='contact-section px-4 py-4 md:pt-[120px] md:px-[120px] pb-[250px] md:pb-[250px]'>
        <div className=''>
          <div className=' contact-area flex flex-col md:flex-row'>
            <div className='contact-form-area  w-full'>
              <h3 className='title'>Get In Touch</h3>
              <p>
                If you have any questions or queries our helpful support team
                will be more than happy to assist.
              </p>
              <form className='contact-form w-full'>
                <div className='form-grp'>
                  <input
                    type='text'
                    name='contact_name'
                    id='contact_name'
                    placeholder='Full Name'
                  />
                </div>
                <div className='form-grp'>
                  <input
                    type='email'
                    name='contact_email'
                    id='contact_email'
                    placeholder='Email Address'
                  />
                </div>
                <div className='form-grp'>
                  <input
                    type='tel'
                    name='contact_phone'
                    id='contact_phone'
                    placeholder='Phone No'
                  />
                </div>
                <div className='form-grp'>
                  <textarea
                    name='contact_message'
                    id='contact_message'
                    placeholder='Message'
                  ></textarea>
                </div>
                <div className='form-grp'>
                  <input
                    className='submit-btn'
                    type='submit'
                    value='sent message'
                  />
                </div>
              </form>
            </div>
            {/* <!-- contact-form-area end --> */}
            <div
              className='address-area has_bg_image'
              data-background='assets/images/contact-mg.jpg'
            >
              <div className='address-area-header'>
                <h3 className='title'>We Are Available</h3>
                <span>24 Hours A Day, 365 Days A Year</span>
              </div>
              <div className='contact-address'>
                <h3 className='title'>Contact Us</h3>
                <ul>
                  <li>
                    <div className='icon'>
                      <i className='fa fa-phone'></i>
                    </div>
                    <div className='content'>
                      <p> +46 10 184 7000</p>
                    </div>
                  </li>
                  <li>
                    <div className='icon flex justify-center items-center'>
                      <BsEnvelope className='text-white' />
                    </div>
                    <div className='content'>
                      <p>
                        <a
                          href='/cdn-cgi/l/email-protection'
                          className='__cf_email__'
                          data-cfemail='2c45424a436c5f435e584943024f4341'
                        >
                          info@upwoking.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='contact-wrapper-footer space-y-10 md:space-y-0 flex flex-col md:flex-row'>
            <span>
              Please see our Frequent Asked Questions (FAQ) page to read more
              information:
            </span>
            <a href='#0' className='cmn-btn'>
              check FAQs
            </a>
          </div>
        </div>
      </section>
      {/* <!-- contact-section end --> */}
    </div>
  );
};

export default Contact3;
