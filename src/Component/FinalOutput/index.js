import React from "react";

const FinalOutput = ({ value }) => (
  <div className='flex flex-col items-center justify-center gap-2'>
    <label className='text-xs font-bold tracking-tighter text-white bg-green-500 py-1 px-4 rounded-xl'>
      Final Output y
    </label>
    <div className='w-[108px] h-[50px] rounded-[15px] border-2 border-[#2DD179] flex items-center justify-center overflow-hidden'>
      <div className='w-1/3 h-full border-r border-1 border-[#C5F2DA]  flex items-center justify-center'>
        <div className='flex items-center text-xs font-bold text-gray-600 gap-1.5'>
          <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
            <span
              className='w-[7px] h-[7px] bg-blue-600 rounded-full'
              id='connector-output'
            ></span>
          </div>
        </div>
      </div>
      <p className='w-2/3 h-full text-center text-lg font-bold text-black bg-transparent flex items-center justify-center overflow-y-auto overflow-x-hidden m-0'>
        {value || ""}
      </p>
    </div>
  </div>
);

export default FinalOutput;
