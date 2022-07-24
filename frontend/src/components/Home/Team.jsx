import React from 'react';
import { FaGooglePlusG, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RiFacebookFill } from 'react-icons/ri';
import tem1 from '../../assets/images/team/1.png';
import tem2 from '../../assets/images/team/2.png';
import tem3 from '../../assets/images/team/3.png';
import tem4 from '../../assets/images/team/4.png';

const Team = () => {
  return (
    <div>
      {/* <!-- team-section start --> */}
      <section className='team-section section-padding section-bg border-top'>
        <div className='md:px-20 px-4'>
          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='section-header text-center'>
                <h2 className='section-title text-5xl text-gray-800 font-bold'>
                  Our Management Team
                </h2>
                <p className='text-gray-700 md:w-8/12 mx-auto'>
                  Our team of creative programmers, marketing experts, and
                  members of the global lottery community have worked together
                  to build the ultimate lottery site, and every win and happy
                  customer reminds us how lucky we are to be doing what we love.
                </p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 m-bottom-not-30'>
            <div className='col-span-12 md:col-span-3 sm:col-span-6'>
              <div className='team-single text-center'>
                <div className='thumb'>
                  <img src={tem1} alt='team' />
                  <ul className='team-social-link flex justify-content-center'>
                    <li>
                      <a href='#'>
                        <RiFacebookFill />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaGooglePlusG />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='content'>
                  <h3 className='name'>Philip Brower</h3>
                  <span className='designation'>Co-Founder & CEO</span>
                </div>
              </div>
            </div>
            {/* <!-- team-single end --> */}
            <div className='col-span-12 md:col-span-3 sm:col-span-6'>
              <div className='team-single text-center'>
                <div className='thumb'>
                  <img src={tem2} alt='team' />
                  <ul className='team-social-link flex justify-content-center'>
                    <li>
                      <a href='#'>
                        <RiFacebookFill />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaGooglePlusG />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='content'>
                  <h3 className='name'>Penny Tool</h3>
                  <span className='designation'>IT Specialist</span>
                </div>
              </div>
            </div>
            {/* <!-- team-single end --> */}
            <div className='col-span-12 md:col-span-3 sm:col-span-6'>
              <div className='team-single text-center'>
                <div className='thumb'>
                  <img src={tem3} alt='team' />
                  <ul className='team-social-link flex justify-content-center'>
                    <li>
                      <a href='#'>
                        <RiFacebookFill />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaGooglePlusG />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='content'>
                  <h3 className='name'>Conrad Berry</h3>
                  <span className='designation'>Consultant</span>
                </div>
              </div>
            </div>
            {/* <!-- team-single end --> */}
            <div className='col-span-12 md:col-span-3 sm:col-span-6'>
              <div className='team-single text-center'>
                <div className='thumb'>
                  <img src={tem4} alt='team' />
                  <ul className='team-social-link flex justify-content-center'>
                    <li>
                      <a href='#'>
                        <RiFacebookFill />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <FaGooglePlusG />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='content'>
                  <h3 className='name'>Alexis Brady</h3>
                  <span className='designation'>Financial Adviser</span>
                </div>
              </div>
            </div>
            {/* <!-- team-single end --> */}
          </div>
        </div>
      </section>
      {/* <!-- team-section end --> */}
    </div>
  );
};

export default Team;
