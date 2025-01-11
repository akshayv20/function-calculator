function OutputCard({ result }) {
  return (
    <div className='p-4 border rounded-md bg-gray-100'>
      <h3 className='text-xl font-bold'>Output</h3>
      <p className='text-lg'>Result: {result}</p>
    </div>
  );
}

export default OutputCard;
