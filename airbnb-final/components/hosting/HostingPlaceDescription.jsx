import React from 'react'
import { Card } from 'flowbite-react'

function HostingPlaceDescription({items,setResponse}) {
  return (
    <div className='grid grid-cols-1 mt-10 mb-20 gap-y-3'>
    {items.map(item=>
    <a href="#!" onClick={()=>{setResponse({title:item.title})}} className="block p-2 m-auto  w-[27rem] bg-white border-2 rounded-lg border-grayish hover:border-2 focus:border-black  hover:bg-gray-100">
    <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-500 ">{item.title}</h5>
    <p className="font-normal text-gray-300">{item.p}</p>
    </a>
    )}
</div>
  )
}

export default HostingPlaceDescription