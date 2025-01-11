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
    <div className='w-[250px] bg-white shadow-md rounded-xl flex flex-col p-4 relative'>
      <h3 className='text-sm font-bold text-gray-600 flex items-center gap-2 mb-2.5'>
        {title}
      </h3>
      <div className='flex flex-col gap-2.5'>
        <div>
          <label className='block text-sm font-semibold mb-2'>Equation</label>
          <input
            type='text'
            value={equation}
            onChange={onChange}
            className='border border-gray-300 rounded-md p-2 text-sm bg-gray-100 w-full'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-semibold mb-2'>
            Next Function
          </label>
          <select
            value={nextFunction}
            onChange={onNextChange}
            className='border border-gray-300 rounded-md p-2 text-sm bg-gray-100 w-full'
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
      <div className='flex justify-between items-center mt-2.5 pt-2.5 border-t border-gray-200'>
        <span
          id={`input-${index + 1}`} // Dynamic ID based on the index
          className='flex items-center text-xs font-bold text-gray-600 gap-1.5'
        >
          <span className='w-2 h-2 bg-blue-600 rounded-full'></span>
          input
        </span>
        <span
          id={`output-${index + 1}`} // Dynamic ID based on the index
          className='flex items-center text-xs font-bold text-gray-600 gap-1.5'
        >
          output
          <span className='w-2 h-2 bg-blue-600 rounded-full'></span>
        </span>
      </div>

      {/* No need to manually place the connector line. The logic for line drawing is handled in App.js */}
    </div>
  );
};

export default FunctionCard;
