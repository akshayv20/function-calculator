import { useState } from "react";

function InputCard({ setX }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setX(Number(inputValue));
  };

  return (
    <div className='mb-4 p-4 border rounded-md bg-gray-100'>
      <input
        type='number'
        value={inputValue}
        onChange={handleChange}
        className='p-2 border rounded-md'
        placeholder='Enter value for x'
      />
      <button
        onClick={handleSubmit}
        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Submit
      </button>
    </div>
  );
}

export default InputCard;
