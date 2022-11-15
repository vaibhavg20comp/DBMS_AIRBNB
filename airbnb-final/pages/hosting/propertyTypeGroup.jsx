import React,{useState,useEffect} from 'react'
import HostingQuestions from '../../components/HostingQuestions'
import HostingForm from '../../components/HostingForm'
import {places,description} from "../../data"


export default function propertyTypeGroup() {
  const [question,setQuestion] = useState("");
  useEffect(()=>{
    setQuestion(places.title);
  },[]);
  return (
    <div className='relative flex flex-row'>
      <HostingQuestions question={question}/>
      <HostingForm/>
    </div>
  )
}
