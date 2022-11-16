import React,{useState,useEffect} from 'react'

import HostingQuestions from '../../components/hosting/HostingQuestions'
import HostingForm from '../../components/hosting/HostingForm'
import HostingFooter from '../../components/hosting/HostingFooter';
import HostingPlaceType from '../../components/hosting/HostingPlaceType';
import HostingPlaceDescription from '../../components/hosting/HostingPlaceDescription';
import HostingGuestSpaceKind from '../../components/hosting/HostingGuestSpaceKind';
import HostingPlaceLocation from '../../components/hosting/HostingPlaceLocation';
import HostingPlaceNumGuests from '../../components/hosting/HostingPlaceNumGuests';
import HostingPlaceAmenities from '../../components/hosting/HostingPlaceAmenities';
import HostingPlacePics from '../../components/hosting/HostingPlacePics';
import HostingPlaceTitle from '../../components/hosting/HostingPlaceTitle';
import HostingPlaceAbout from '../../components/hosting/HostingPlaceAbout';
import HostingPlacePrice from '../../components/hosting/HostingPlacePrice';
import axios from 'axios';

import { formQuestionsData } from "../../data";
import ImageUpload from '../../components/hosting/ImageUpload';
import HouseRules from '../../components/hosting/HouseRules';
const FormResponse=[];

export default function becomeHost() {
  const [id,setId] = useState(0);
  const [response,setResponse] = useState(null);
  const [buttondisable,setButtondisable] =useState(true);
  const onclick=()=>{
    
    FormResponse.push({id,response})
    console.log(FormResponse);
    setId((c)=>FormResponse.length<=formQuestionsData.length ? (c+1):c);
    setResponse(null);
    setButtondisable(true)
  }
  // const submit = function(){
  //   axios.post('http://localhost:3003/becomeHost',{FormResponse});
  // }
  const onclickBack=()=>{
    setResponse(null);
    setId((c)=>c-1);
    const objwithid=FormResponse.findIndex((obj)=>obj.id===id);
    FormResponse.splice(objwithid,1);
    setButtondisable(true)
  }
  // console.log(formQuestionsData);
  const renderComponent = ()=>{
    if(id===0){
      return <HostingPlaceType items={formQuestionsData[id].items} setResponse={setResponse} setButtondisable={setButtondisable}/>
    }
    else if (id===1){
      return <HostingPlaceDescription items={formQuestionsData[id].items} setResponse={setResponse}/>
    }
    else if(id===2){
      return <HostingGuestSpaceKind items={formQuestionsData[id].items} setResponse={setResponse}/>
    }
    else if(id===3){
      return <HostingPlaceLocation setResponse={setResponse}/>
    }
    else if(id===4){
      return <HostingPlaceNumGuests setResponse={setResponse}/>
    }
    else if(id===5){
      return <HostingPlaceAmenities items={formQuestionsData[id].items} setResponse={setResponse}/>
    }
    else if(id===6){
      return <HouseRules items={formQuestionsData[id].items} setResponse={setResponse}/>
    }
    else if(id===7){
      return <ImageUpload setResponse={setResponse}/>
    }
    else if(id===8){
      return <HostingPlaceTitle setResponse={setResponse}/>
    }
    else if(id===9){
      return <HostingPlaceAbout setResponse={setResponse}/>
    }
    else if(id===10){
      return <HostingPlacePrice setResponse={setResponse}/>
    }
  }
  return (
    <div className='relative flex flex-row'>
      <HostingQuestions question={formQuestionsData[id]?.title} />
      <div className=' relative inset-x-1/2 mb-[2rem] w-1/2  '> 
        {renderComponent()}
      </div>
      <HostingFooter 
      id={id} 
      objlen={formQuestionsData.length} 
      reslen={FormResponse.length}
      onclick={onclick}
      onclickBack={onclickBack}
      buttonDisable ={buttondisable}
      />
    </div>
  )
}
