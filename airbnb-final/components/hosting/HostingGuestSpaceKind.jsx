import React from 'react'

function HostingGuestSpaceKind({items,setResponse}) {
  return (
    <div className='grid grid-cols-1 absolute top-[12rem] left-[7rem] gap-y-3'>
    {items.map(item=>
    <a href="#!" onClick={()=>{setResponse({title:item})}} className="block p-2 m-auto  w-[27rem] bg-white border-2 rounded-lg hover:border-2 focus:border-black  hover:bg-gray-100">
    <h5 className="m-3 font-bold  tracking-tight text-gray-500 ">{item}</h5>
    </a>
    )}
</div>
  )
}

export default HostingGuestSpaceKind