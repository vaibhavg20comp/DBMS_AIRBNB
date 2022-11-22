import React,{useState} from 'react'
import Image from 'next/image'


import { Card } from 'flowbite-react'
function HostingPlaceAmenities({items,setResponse}) {
  const [checked,setChecked] =useState([]);
  return (
    <div className='absolute flex flex-col w-[40rem] h-[40rem] left-[1rem] top-[4rem] bottom-[5rem]'>
      {
        items.map((item,index)=>(
          <div key={index}>
          <h5>{item.title}</h5>
          <div className='grid gap-4 m-[3rem] w-[35rem] md:grid-cols-3'>
            {
              item?.amenities?.map((amenity,i)=>(
                <div key={i} className='w-[11rem] h-[9rem]'>
                  <input 
                  type="checkbox" 
                  id={amenity.id} 
                  className='hidden peer'
                  onChange={(e)=>{
                    if(e.target.checked){
                      setChecked([...checked,amenity.name]);
                    }else{
                      setChecked(
                        checked.filter((p)=>p.name!==amenity.name)
                      );
                    }
                    setResponse([...checked,amenity.name]);
                  }}
                  value={checked}
                  />
                  <label htmlFor={amenity.id} className="inline-flex justify-between items-center h-full w-full text-gray-500 bg-white   border-x border-y rounded-md border-grayish cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-gray-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                    <div className="block m-auto">
                        {/* If needed svg can be put here only nothing else */}
                        <div className="flex flex-col w-full h-full text-md font-semibold">{amenity.name}</div>
                    </div>
                  </label>
                </div>
              ))
            }
          
          </div>
          </div>
        ))
      }
      </div>
     
  )
}

export default HostingPlaceAmenities

