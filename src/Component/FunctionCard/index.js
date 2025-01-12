import React from "react";

const FunctionCard = ({
  title,
  equation,
  onChange,
  output,
  nextFunction,
  onNextChange,
  index
}) => {
  console.log("index", index);
  return (
    <div className='w-235 h-251 bg-white shadow-md rounded-xl flex flex-col gap-4 px-4 py-2  relative border border-[#DBDBDB]'>
      <div className=' text-[#A5A5A5] font-inter  tracking-tighter text-[14px] font-semibold  text-left decoration-transparent'>
        :::&nbsp; {title}
      </div>
      <div className=''>
        <div className='flex flex-col gap-2.5'>
          <div className='mb-1'>
            <label className='block text-xs  tracking-tighter font-semibold mb-1'>
              Equation
            </label>
            <input
              type='text'
              value={equation}
              onChange={onChange}
              className='border h-8 border-gray-300 rounded-md p-2 text-sm bg-gray-100 w-full'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-xs  tracking-tighter font-semibold mb-1'>
              Next function
            </label>
            <select
              value={nextFunction}
              disabled
              onChange={onNextChange}
              className='border h-8 border-gray-300 rounded-md p-2 text-xs bg-gray-100 w-full'
            >
              <option value={-1}>End</option>
              {[...Array(5).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  Function {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex justify-between items-center  pt-4 mt-2'>
          <div className='flex items-center ml-1 mt-1 text-xs tracking-tighter font-bold text-gray-600 gap-1'>
            <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
              <span
                className='w-[7px] h-[7px] bg-blue-600 rounded-full'
                id={`input-${index + 1}`}
              ></span>
            </div>
            <div className='text-[#585757] font-inter tracking-tighter text-[10px] font-bold'>
              input
            </div>
          </div>
          <div className='flex items-center text-xs tracking-tighter font-bold text-gray-600 gap-1'>
            <div className='text-[#585757] font-inter text-[10px] font-bold '>
              {" "}
              output
            </div>

            <div className='w-[15px] h-[15px] border-2 border-[#DBDBDB] rounded-full flex items-center justify-center'>
              <span
                className='w-[7px] h-[7px] bg-blue-600 rounded-full'
                id={`output-${index + 1}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
