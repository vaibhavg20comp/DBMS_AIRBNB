import React from 'react'

function HostingPlaceType({items,setResponse,setButtondisable}) {
    {/* card component with image, border dark on select */}
  return (
     <div className='grid grid-cols-1 mt-10 gap-y-3'>
        {items.map((item,index)=>
          <a key={index} href="#!" onClick={()=>setResponse({title:item.title})} className="m-auto p-0 w-[27rem] bg-gray-100 rounded-lg border-2 border-gray-200  hover:border-2 focus:border-black dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className='flex items-center justify-between m-2'>
              <span>
              <h5 className="m text-lg font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
              </span>
              <span>
                <img 
                src={item.url} 
                alt="..." 
                className='rounded-md'
                width={55}
                height={55}
                />
              </span>
            </div>  
          </a>
        )}
  </div>

  )
}

export default HostingPlaceType
