import { Link } from 'react-router-dom';

const Banner = ({ title }) => {
  return (
    <div>
      {/* <!-- inner-page-banner start --> */}
      <section className='inner-page-banner contact-bg  has_bg_image'>
        <div className=' px-4 md:px-24'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='inner-page-banner-area '>
                <h1 className='page-title text-3xl md:text-5xl font-bold text-gray-700'>
                  {title}
                </h1>
                <nav aria-label='breadcrumb' className='page-header-breadcrumb'>
                  <ol className='breadcrumb flex gap-4'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item  active'>{title}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- inner-page-banner end --> */}
    </div>
  );
};

export default Banner;
