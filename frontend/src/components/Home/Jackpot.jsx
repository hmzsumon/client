import jackpot1 from '../../assets/images/elements/jackpot-1.png';
import jackpot2 from '../../assets/images/elements/jackpot-2.png';
import jackpot3 from '../../assets/images/elements/jackpot-3.png';

const Jackpot = () => {
  return (
    <div>
      {/* <!-- jackpot-section start --> */}
      <section className='jackpot-section section-padding'>
        <div className=''>
          <div className=' justify-content-center'>
            <div className='section-header text-center'>
              <h2 className='section-title text-2xl md:text-5xl font-bold text-gray-800'>
                Lottery Jackpots
              </h2>
              <p className='text-gray-700 px-2 md:w-1/3 mx-auto'>
                Choose from the Powerball, Mega Millions, Lotto or Lucky Day
                Lotto and try for a chance to win a big cash prize
              </p>
            </div>
          </div>
          <div className='grid md:grid-cols-3 space-y-6 md:space-y-0 px-4 md:px-10 gap-4'>
            <div className=''>
              <div className='jackpot-item text-center'>
                <img src={jackpot1} alt='' className='mx-auto' />
                <span className='amount'>€161,557,581</span>
                <h5 className='title'>US Powerball</h5>
                <p className='next-draw-time'>
                  Next Draw : <span id='remainTime1'></span>
                </p>
                <a href='#0' className='cmn-btn'>
                  play now!
                </a>
              </div>
            </div>
            {/* <!-- jackpot-item end --> */}
            <div className='col-lg-4 col-md-6'>
              <div className='jackpot-item text-center'>
                <img src={jackpot2} alt='' className='mx-auto' />
                <span className='amount'>€161,557,581</span>
                <h5 className='title'>Cancer Charity</h5>
                <p className='next-draw-time'>
                  Next Draw : <span id='remainTime2'></span>
                </p>
                <a href='#0' className='cmn-btn'>
                  play now!
                </a>
              </div>
            </div>
            {/* <!-- jackpot-item end --> */}
            <div className='col-lg-4 col-md-6'>
              <div className='jackpot-item text-center'>
                <img src={jackpot3} alt='' className='mx-auto' />
                <span className='amount'>€161,557,581</span>
                <h5 className='title'>EuroJackpot</h5>
                <p className='next-draw-time'>
                  Next Draw : <span id='remainTime3'></span>
                </p>
                <a href='#0' className='cmn-btn'>
                  play now!
                </a>
              </div>
            </div>
            {/* <!-- jackpot-item end --> */}
            {/* <div className='col-lg-12 text-center'>
              <a href='#0' className='text-btn'>
                Show all lotteries
              </a>
            </div> */}
          </div>
        </div>
      </section>
      {/* <!-- jackpot-section start --> */}
    </div>
  );
};

export default Jackpot;
