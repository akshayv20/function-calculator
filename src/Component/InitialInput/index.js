import React from "react";

const InitialInput = ({ value, onChange }) => (
  <div className='flex flex-col items-center justify-center gap-2'>
    <label className='text-xs font-bold tracking-tighter text-white bg-orange-400 py-1 px-3 rounded-xl'>
      Initial value of x
    </label>
    <div className='w-[111px] h-[50px] rounded-[15px] border-2 border-[#FFC267] flex items-center justify-center overflow-hidden'>
      <input
        type='number'
        value={value || ""}
        placeholder='Enter x'
        onChange={(e) => onChange(Number(e.target.value))}
        className='w-2/3 h-full border-none outline-none text-center text-lg font-bold text-black bg-transparent input-no-spin'
      />
      <div className='w-1/3 h-full border-l border-1 border-[#FFEED5] flex items-center justify-center'>
        <div
          className='flex items-center text-xs font-bold text-gray-600 gap-1.5 connector-label-input'
          id='connector-label-input'
        >
          <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
            <span
              className='w-[7px] h-[7px] bg-blue-600 rounded-full'
              id='connector-input'
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InitialInput;
