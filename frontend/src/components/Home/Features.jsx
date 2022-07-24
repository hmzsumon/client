import React from 'react';
import Feature from './Feature';

const features = [
  {
    id: 1,
    title: 'SURVEYS',
    img: '/images/features/feature1.jpg',
    description: 'Get paid for your opinion.',
    link: '/survey',
    linkText: 'Answer now',
  },
  {
    id: 2,
    title: 'GAMES',
    img: '/images/features/feature2.jpg',
    description: 'Earn by playing games.',
    link: '/game',
    linkText: 'Play now',
  },
  {
    id: 3,
    title: 'QUICK POINTS',
    img: '/images/features/feature3.jpg',
    description: 'Get paid for your opinion.',
    link: '/point',
    linkText: 'Start now',
  },
  {
    id: 4,
    title: 'OFFER WALLS',
    img: '/images/features/feature4.jpg',
    description: 'Get paid for your opinion.',
    link: '/offer',
    linkText: 'Start now',
  },
];

const Features = () => {
  return (
    <section className='features h-full w-full px-20 py-10'>
      <div className=' grid grid-cols-1 items-center  gap-6 md:gap-4 md:grid-cols-4'>
        {features.map((item) => (
          <div key={item.id}>
            <Feature {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
