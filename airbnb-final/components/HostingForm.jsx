import React from 'react'
import HostingFooter from './HostingFooter'

function HostingForm() {
  return (
    <div className=' relative inset-x-1/2 w-1/2  '> 
        {/* card component with image, border dark on select */}
      <div className='grid grid-cols-1 mt-10 gap-y-3'>
        <a href="#" className="m-auto p-0 w-[27rem] bg-gray-100 rounded-lg border border-gray-200  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className='flex items-center justify-between m-2'>
            <span>
            <h5 className="m text-lg font-bold tracking-tight text-gray-900 dark:text-white">Flat</h5>
            </span>
            <span>
              <img 
              src="https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240" 
              alt="..." 
              className='rounded-md'
              width={55}
              height={55}
              />
            </span>
          </div>
        </a>
        
      </div>        

      {/* footer with back and next link */}
      <HostingFooter/>
    </div>
  )
}

export default HostingForm


{/* <div className='grid grid-cols-1 gap-y-3'> 
<Card className='mx-[7rem]'>
  <div className='flex items-center justify-between bg-black'>
  <span className='text-xl font-bold text-gray-500 dark:text-white'>
    hello
  </span>
    <img 
    src="https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg?im_w=240" 
    alt="..." 
    className='rounded-xl'
    /> 
  </div>
</Card>
</div> */}
