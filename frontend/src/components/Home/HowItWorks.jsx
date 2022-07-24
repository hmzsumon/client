import line from '../../assets/images/elements/line.png';
import step from '../../assets/images/elements/step.png';
import icon1 from '../../assets/images/svg-icons/how-work-icons/1.svg';
import icon2 from '../../assets/images/svg-icons/how-work-icons/2.svg';
import icon3 from '../../assets/images/svg-icons/how-work-icons/3.svg';

const HowItWorks = () => {
  return (
    <div>
      {/* <!-- work-steps-section strat --> */}
      <section className='work-steps-section section-padding border-top'>
        <div className=''>
          <div className='row justify-content-center'>
            <div className='col-lg-7'>
              <div className='section-header text-center'>
                <h2 className='section-title text-2xl md:text-5xl font-bolt text-gray-800'>
                  how it works
                </h2>
                <p className='text-gray-700'>
                  Sorteo is the best way to play these exciting lotteries from
                  anywhere in the world.
                </p>
              </div>
            </div>
          </div>
          <div className='md:flex items-center px-6 md:px-28'>
            <div className='w-full md:w-6/12'>
              <div className='work-steps-items-part md:flex grid grid-cols-12'>
                <div className='line hidden md:block'>
                  <img src={line} alt='' />
                </div>
                <div className='work-steps-item col-span-6  '>
                  <div className='work-steps-item-inner w-full '>
                    <div className='icon'>
                      <img src={icon1} alt='icon' />
                      <span className='count-num'>01</span>
                    </div>
                    <h4 className='title'>choose</h4>
                    <p>Choose your lottery & pick your numbers</p>
                  </div>
                </div>
                {/* <!-- work-steps-item end --> */}
                <div className='work-steps-item col-span-6'>
                  <div className='work-steps-item-inner'>
                    <div className='icon '>
                      <img src={icon2} alt='icon' />
                      <span className='count-num'>02</span>
                    </div>
                    <h4 className='title'>buy</h4>
                    <p>Complete your purchase</p>
                  </div>
                </div>
                {/* <!-- work-steps-item end --> */}
                <div className='work-steps-item col-span-6'>
                  <div className='work-steps-item-inner'>
                    <div className='icon'>
                      <img src={icon3} alt='icon' />
                      <span className='count-num'>03</span>
                    </div>
                    <h4 className='title'>win</h4>
                    <p>Start dreaming, you're almost there</p>
                  </div>
                </div>
                {/* <!-- work-steps-item end --> */}
              </div>
            </div>
            <div className='w-full md:w-6/12'>
              <div className='work-steps-thumb-part'>
                <img src={step} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- work-steps-section strat --> */}
    </div>
  );
};

export default HowItWorks;
