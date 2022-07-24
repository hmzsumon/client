import flag1 from '../../assets/images/flag/1.jpg';
import flag2 from '../../assets/images/flag/2.jpg';
import flag3 from '../../assets/images/flag/3.jpg';
import flag4 from '../../assets/images/flag/4.jpg';
import flag5 from '../../assets/images/flag/5.jpg';

const LotteryResult = () => {
  return (
    <>
      {/* <!-- lottery-result-section start --> */}
      <section
        className='lottery-result-section section-padding has_bg_image'
        data-background='assets/images/bg-one.jpg'
      >
        <div className=''>
          <div className='col-lg-7'>
            <div className='section-header text-center'>
              <h2 className='section-title text-5xl text-gray-800 font-bold'>
                Latest Lottery Results
              </h2>
              <p className='text-gray-700'>
                Check your lotto results online, find all the lotto winning
                numbers and see if you won the latest lotto jackpots!{' '}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-10 items-center px-4 md:px-20 '>
            <div className='col-span-12 md:col-span-8'>
              <div className='lottery-winning-num-part'>
                <div className='lottery-winning-num-table'>
                  <h3 className='block-title'>lottery winning numbers</h3>
                  <div className='lottery-winning-table '>
                    <table>
                      <thead>
                        <tr>
                          <th className='name'>lottery</th>
                          <th className='date'>draw date</th>
                          <th className='numbers'>winning numbers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='winner-details flex'>
                              <img src={flag1} alt='flag' />
                              <span className='winner-name'>
                                cancer charity
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className='winning-date'>30/05/2018</span>
                          </td>
                          <td>
                            <ul className='number-list'>
                              <li>19</li>
                              <li>31</li>
                              <li>21</li>
                              <li className='active'>69</li>
                              <li>99</li>
                              <li>77</li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='winner-details flex'>
                              <img src={flag2} alt='flag' />
                              <span className='winner-name'>US Powerball</span>
                            </div>
                          </td>
                          <td>
                            <span className='winning-date'>30/05/2018</span>
                          </td>
                          <td>
                            <ul className='number-list'>
                              <li>19</li>
                              <li>31</li>
                              <li>21</li>
                              <li className='active'>69</li>
                              <li>99</li>
                              <li className='active'>77</li>
                              <li>65</li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='winner-details flex'>
                              <img src={flag3} alt='flag' />
                              <span className='winner-name'>Mega Millions</span>
                            </div>
                          </td>
                          <td>
                            <span className='winning-date'>30/05/2018</span>
                          </td>
                          <td>
                            <ul className='number-list'>
                              <li>19</li>
                              <li>31</li>
                              <li className='active'>21</li>
                              <li className='active'>69</li>
                              <li>99</li>
                              <li className='active'>77</li>
                              <li>66</li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='winner-details flex'>
                              <img src={flag4} alt='flag' />
                              <span className='winner-name'>UK Lotto</span>
                            </div>
                          </td>
                          <td>
                            <span className='winning-date'>30/05/2018</span>
                          </td>
                          <td>
                            <ul className='number-list'>
                              <li>19</li>
                              <li>31</li>
                              <li>21</li>
                              <li className='active'>69</li>
                              <li>99</li>
                              <li>77</li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className='winner-details flex'>
                              <img src={flag5} alt='flag' />
                              <span className='winner-name'>Mega Millions</span>
                            </div>
                          </td>
                          <td>
                            <span className='winning-date'>30/05/2018</span>
                          </td>
                          <td>
                            <ul className='number-list'>
                              <li>19</li>
                              <li>31</li>
                              <li className='active'>21</li>
                              <li className='active'>69</li>
                              <li>99</li>
                              <li className='active'>77</li>
                              <li>66</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-4'>
              <div className='winner-part'>
                <h3 className='block-title'>our winners</h3>
                <div className='winner-list'>
                  <div className='winner-single'>
                    <div className='winner-header flex'>
                      <img src={flag1} alt='flag' />
                      <span className='name'>vola pitmar</span>
                    </div>
                    <p>
                      <span className='lottery-name'>Cancer Charity</span>
                      <span className='date'>30/05/2018</span>
                    </p>
                    <h5 className='prize-amount'>€500.00</h5>
                  </div>
                  {/* <!-- winner-single end --> */}
                  <div className='winner-single'>
                    <div className='winner-header flex'>
                      <img src={flag4} alt='flag' />
                      <span className='name'>cay colon</span>
                    </div>
                    <p>
                      <span className='lottery-name'>Powerball</span>
                      <span className='date'>30/05/2018</span>
                    </p>
                    <h5 className='prize-amount'>€340.00</h5>
                  </div>
                  {/* <!-- winner-single end --> */}
                  <div className='winner-single'>
                    <div className='winner-header flex'>
                      <img src={flag5} alt='flag' />
                      <span className='name'>irez newtkon</span>
                    </div>
                    <p>
                      <span className='lottery-name'>Powerball</span>
                      <span className='date'>30/05/2018</span>
                    </p>
                    <h5 className='prize-amount'>€130.00</h5>
                  </div>
                  {/* <!-- winner-single end --> */}
                </div>
              </div>
            </div>
            {/* <div className='col-lg-12 text-center'>
              <a href='#' className='text-btn'>
                see all result
              </a>
            </div> */}
          </div>
        </div>
      </section>
      {/* <!-- lottery-result-section end --> */}
    </>
  );
};

export default LotteryResult;
