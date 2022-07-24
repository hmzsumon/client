import React from 'react';
import BoxItem from './BoxItem';

function LuckyBoxCard({ luckyBoxes }) {
  return (
    <div className='flex flex-col col-span-full z-10 sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <div className='p-4 pb-10 md:pb-2'>
        <h2 className='text-xl text-gray-800 text-center'>
          Not opened yet Lucky Box
        </h2>
        <div className='grid grid-cols-12 h-full w-full items-center justify-center'>
          {luckyBoxes &&
            luckyBoxes.map((luckyBox) => (
              <BoxItem key={luckyBox._id} luckyBox={luckyBox} open={true} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LuckyBoxCard);
