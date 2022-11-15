import React,{useState} from 'react'
import { Card,Textarea ,Label } from 'flowbite-react'

function HostingPlaceTitle({setResponse}) {
  const [term,setTerm] =useState('');
  
  return (

    <div id="textarea" className='absolute  h-[45rem] w-[35rem] top-[12rem]'>
      <div className="mb-5 block relative left-[7rem]">
        <Label
          htmlFor="comment"
          value="Create your title"
          className='text-xl '
        />
        <p className=' text-sm flex flex-col max-w-[30rem]'>Your listing title should highlight what makes your place special</p>
      </div>
      <Textarea
        id="comment"
        placeholder="Cheerful 1-bedroom villa ..."
        required={true}
        rows={4}
        className='relative left-[7rem] max-h-[10rem] max-w-[30rem]'
        value={term}
        onChange={e=>{
          setTerm(e.target.value)
          setResponse({property_title:term})
        }}
      />
    </div>

  )
}

export default HostingPlaceTitle
