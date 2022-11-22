import React,{useState} from 'react'
import { Card,Textarea ,Label } from 'flowbite-react'

function HostingPlaceAbout({setResponse}) {
  const [term,setTerm] =useState('');
  return (
    <div id="textarea" className='absolute  h-[45rem] w-[35rem] top-[12rem]'>
    <div className="mb-5 block relative left-[7rem]">
      <Label
        htmlFor="comment"
        value="Create your description"
        className='text-xl '
      />
    </div>
    <Textarea
      id="comment"
      placeholder="Relax with the whole family at this peaceful place to stay ."
      required={true}
      rows={4}
      className='relative left-[7rem] max-h-[10rem] max-w-[30rem]'
      value={term}
      onChange={e=>{
        setTerm(e.target.value)
        setResponse({property_description:e.target.value})
      }}
    />
  </div>
  )
}

export default HostingPlaceAbout