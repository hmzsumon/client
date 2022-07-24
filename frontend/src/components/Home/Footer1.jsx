const Footer1 = () => {
  return (
    <div>
      {/* <!-- footer-section start --> */}
      <footer className='footer-section'>
        <div
          className='footer-top border-top border-bottom has_bg_image'
          data-background='../../assets/images/bg-four.jpg'
        >
          <div className='footer-top-first'>
            <div className=''>
              <div className='grid grid-cols-12 px-4 md:px-20'>
                <div className=' col-span-12 md:col-span-5 sm:col-span-4 text-center md:text-left'>
                  <a href='home-one.html' className='site-logo'>
                    <img
                      src='./images/up-logo.png'
                      alt='logo'
                      className='w-auto h-24'
                    />
                  </a>
                </div>
                <div className='col-span-12 md:col-span-7 mx-auto sm:col-span-8'>
                  <div className='number-count-part flex'>
                    <div className='number-count-item'>
                      <span className='number'>2,3402,233</span>
                      <p>TOTAL MEMBERS</p>
                    </div>
                    <div className='number-count-item'>
                      <span className='number'>1,9402,575</span>
                      <p>TOTAL winner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-top-second'>
            <div className=''>
              <div className=' grid grid-cols-12 px-4 md:px-20 items-center justify-center  w-full'>
                <div className=' xl:col-span-2  lg:col-span-2 text-center md:text-left  md:col-span-3 sm:col-span-6 col-span-12'>
                  <div className='footer-widget widget-about'>
                    <h3 className='widget-title'>About Upwork</h3>
                    <ul className='footer-list-menu '>
                      <li>
                        <a href='#0'>About us</a>
                      </li>
                      <li>
                        <a href='#0'>How it Works</a>
                      </li>
                      <li>
                        <a href='#0'>Our services</a>
                      </li>
                      <li>
                        <a href='#0'>Blog</a>
                      </li>
                      <li>
                        <a href='#0'>Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='xl:col-span-2  lg:col-span-2 text-center md:text-left  md:col-span-3 sm:col-span-6 col-span-12'>
                  <div className='footer-widget widget-links'>
                    <h3 className='widget-title'>Quick links</h3>
                    <ul className='footer-list-menu'>
                      <li>
                        <a href='#0'>My Account</a>
                      </li>
                      <li>
                        <a href='#0'>Affiliate Program</a>
                      </li>
                      <li>
                        <a href='#0'>Terms & Conditions</a>
                      </li>
                      <li>
                        <a href='#0'>Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className='md:col-span-6 mx-auto col-span-12'>
                  <div className='footer-widget widget-subscribe'>
                    <h3 className='widget-title'>email newsletters</h3>
                    <div className='subscribe-part'>
                      <p>
                        Subscribe now and receive weekly newsletter for latest
                        draw and offer news and much more!
                      </p>
                      <form className='subscribe-form'>
                        <input
                          type='email'
                          name='subs_email'
                          id='subs_email'
                          placeholder='Email address'
                        />
                        <input type='submit' value='subscribe' />
                      </form>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- footer-section end --> */}
    </div>
  );
};

export default Footer1;
