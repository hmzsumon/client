import React from 'react';
import { Link } from 'react-router-dom';
const footerContents = [
  {
    id: 1,
    title: 'Earn',
    links: [
      {
        id: 1,
        name: 'Take Surveys',
      },
      {
        id: 2,
        name: 'Play Games',
      },
      {
        id: 3,
        name: 'Earn Quick',
      },
      {
        id: 4,
        name: 'Earn Points',
      },
      {
        id: 5,
        name: 'Browse Offer',
      },
      {
        id: 6,
        name: 'Walls',
      },
      {
        id: 7,
        name: 'Refer Friends',
      },
    ],
  },
  {
    id: 2,
    title: 'Cashouts',
    links: [
      {
        id: 1,
        name: 'Take Surveys',
      },
      {
        id: 2,
        name: 'Play Games',
      },
      {
        id: 3,
        name: 'Earn Quick',
      },
      {
        id: 4,
        name: 'Earn Points',
      },
      {
        id: 5,
        name: 'Browse Offer',
      },
      {
        id: 6,
        name: 'Walls',
      },
      {
        id: 7,
        name: 'Refer Friends',
      },
    ],
  },
  {
    id: 3,
    title: 'Help',
    links: [
      {
        id: 1,
        name: 'Take Surveys',
      },
      {
        id: 2,
        name: 'Play Games',
      },
      {
        id: 3,
        name: 'Earn Quick',
      },
      {
        id: 4,
        name: 'Earn Points',
      },
      {
        id: 5,
        name: 'Browse Offer',
      },
      {
        id: 6,
        name: 'Walls',
      },
      {
        id: 7,
        name: 'Refer Friends',
      },
    ],
  },
  {
    id: 4,
    title: 'More',
    links: [
      {
        id: 1,
        name: 'Take Surveys',
      },
      {
        id: 2,
        name: 'Play Games',
      },
      {
        id: 3,
        name: 'Earn Quick',
      },
      {
        id: 4,
        name: 'Earn Points',
      },
      {
        id: 5,
        name: 'Browse Offer',
      },
      {
        id: 6,
        name: 'Walls',
      },
      {
        id: 7,
        name: 'Refer Friends',
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='bg-[#055184] px-10 py-10'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='grid grid-cols-2 gap-10 md:grid-cols-4'>
          {footerContents.map((footerContent) => {
            const { id, title, links } = footerContent;
            return (
              <li key={id} className='list-none'>
                <h3 className='text-2xl font-bold text-white'>{title}</h3>
                {links.map((link) => (
                  <Link to='#' key={link.id}>
                    <span className='text-sm text-white'>{link.name}</span>
                  </Link>
                ))}
              </li>
            );
          })}
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>About Up works</h1>
          <p className='mt-4 text-white'>
            GetPaidTo is a thriving community which is growing daily. It's a
            free rewards program which allows its members to make great earnings
            online, at times that suit them and without ever needing to spend
            any of their own money.
          </p>
          <div className='bg-[#62A642] py-2 w-full text-center mt-6 rounded text-xl uppercase text-white font-bold'>
            <Link to='/'>
              <span>Join Free Now</span>
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-10 text-center text-white border-t'>
        <p className='mt-10'> &copy; 2022 Up work. All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;
