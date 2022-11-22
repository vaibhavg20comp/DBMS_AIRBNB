import { useState } from 'react';
import Button from '@mui/material/Button';
import { Modal } from 'react-bootstrap';

function SubmitModal({confirm,cancel,isVisible,property_title,checkIn,checkOut,rate,guests,noOfDays}) {
  if (!isVisible) return null;
  return (
    <>
    <div className='fixed inset-0 bg-black bg-opacity-50 background-blur-sm flex justify-center items-center'>
    <div className='w-[600px] flex flex-col'>
    <button className='text-white text-xl place-self-end'>X

    </button>
    <div className='bg-white p-2 rounded overflow-auto'>
   <div className='h-96 overflow-scroll p-6'>
    <h3 className='text-xl font-semibold text-gray-900 mb-5'>Booking Details</h3>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Property Name
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {property_title}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Check In Date
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {checkIn.split('T')[0]}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Check Out Date
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {checkOut.split('T')[0]}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Todal days of Stays
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {noOfDays}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Price for 1 Night
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    ₹ {rate}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Total Price before Tax
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    ₹ {rate*noOfDays}
    </p>
    <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Total Guests
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {guests.adults+guests.children+guests.infants}
    </p>
    {guests.adults?
   <div>
     <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Total Adults
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {guests.adults}
    </p>
   </div>:""}
   {guests.children?
   <div>
     <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Total Children
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {guests.children}
    </p>
   </div>:""}
   {guests.infants?
   <div>
     <h5 className='text-xl font-semibold text-gray-900 mb-5'>
    Total Infants
    </h5>
    <p className='mb-5 font-normal text-gray-500'>
    {guests.infants}
    </p>
   </div>:""}
   <div className='flex justify-between mt-9'>
   <Button variant='outlined' onClick={confirm} color="success">Confirm</Button>
   <Button variant='outlined' onClick={cancel} color="error">Cancel</Button>
   </div>
   </div>
    </div>
    </div>
    </div>

    </>
  );
}

export default SubmitModal;