import React, { useState } from 'react'

function HostingQuestions({question}) {
  return (
    <div className='fixed flex flex-col min-h-screen w-1/2 bg-gradient-to-b   from-pink-600 via-purple-700 to-indigo-700 justify-center'>
      <h2 className="mx-10 text-left  overflow-hidden  text-2xl  text-white font-bold md:mb-4  md:text-3xl lg:text-4xl ">
          {question}
      </h2>
    </div>
    
  )
}

export default HostingQuestions;
// bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500
