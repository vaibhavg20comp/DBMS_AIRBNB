import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Modal } from 'react-bootstrap';

function CancelModal({confirm,cancel,isVisible,property_title,booking_id,property_id,listed,state}) {
  if (!isVisible) return null;
  const [text, setText] = useState("");
  console.log(property_id,listed)
  useEffect(() => {
    setText(state===0?"Cancel Booking":listed===0?"List Property":"Unlist Property")
  }, [])
  return (
    <>
    <div className='fixed inset-0 bg-black bg-opacity-50 background-blur-sm flex justify-center items-center'>
    <div className='w-[600px] flex flex-col'>
    <button onClick={cancel} className='text-white text-xl place-self-end'>X

    </button>
    <div className='bg-white p-2 rounded overflow-auto'>
   <div className='h-96 overflow-scroll p-6'>
    <h3 className='text-xl font-semibold text-gray-900 mb-5'>{text}</h3>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Property Name
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {property_title}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Booking Id
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {booking_id}
    </p>
   <div className='flex justify-between mt-9'>
    
      {state===0?<Button variant='outlined' onClick={(e)=>{confirm(booking_id,property_id)}} color="success">{text}</Button>:<Button variant='outlined' onClick={(e)=>{confirm(property_id,listed)}} color="success">{text}</Button>}
    
    
   <Button variant='outlined' onClick={cancel} color="error">Close</Button>
   </div>
   </div>
    </div>
    </div>
    </div>

    </>
  );
}

export default CancelModal;