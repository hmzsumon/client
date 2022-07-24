import React from 'react';
import { Link } from 'react-router-dom';

const Feature = ({ title, img, description, link, linkText }) => {
  return (
    <div className='flex flex-col items-center pt-4 space-y-6 border'>
      <h1 className='text-2xl text-[#74BB53] font-medium'>{title}</h1>

      <div>
        <img
          src={img}
          alt='survey'
          width={160}
          height={160}
          className='mx-auto rounded-full -z-20'
        />
      </div>

      <p>{description}</p>
      <Link to={link}>
        <span className='bg-[#6bb748] text-center w-full px-8 py-2 text-xl font-medium text-white'>
          {linkText}
        </span>
      </Link>
    </div>
  );
};

export default Feature;
