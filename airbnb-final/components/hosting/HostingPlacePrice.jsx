import React, { useState } from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';

function HostingPlacePrice({setResponse}) {
  const [value,setValue] =useState(0);
  return (
    <div className='flex flex-col'> 
    <div className=" absolute flex items-center w-[30rem]  top-[10rem] left-[8rem]">
    <span
      role="button"
      tabIndex={0}
      className={`${
        ( typeof value!='number' || value===0 || value ===null) && 'cursor-not-allowed opacity-40'
      } btnDecrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300`}
      onClick={()=>{
        setValue((n)=>(n-1)>=0?n-1:0)
        setResponse({price_per_night:Number(value)})
      }}
    >
      <MinusIcon className="h-8 text-gray-300" />
    </span>
    <span className="inline-block text-center w-full ">
      <input className=' border-2 border-black rounded-lg w-[20rem] h-[6rem] text-5xl text-center' 
      type="number"  
      value={value}
      onChange={e=>{
        console.log(e.target.value)
        setValue(e.target.value)
        setResponse(value)
      }}
      placeholder={'₹00'}
      />
      </span>
    <span
      role="button"
      tabIndex={0}
      className=" btnIncrease p-[7px] border border-gray-300  rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300"
      onClick={()=>{
        
        setValue((n)=>Number(n)+1)
        setResponse({price_per_night:Number(value)})
      }}
    >
      <PlusIcon className="h-8 text-gray-300" />
    </span>
  </div>
    <p className = "absolute top-[17rem] left-[20rem]">₹ per night</p>
  </div>
  )
}

export default HostingPlacePrice

