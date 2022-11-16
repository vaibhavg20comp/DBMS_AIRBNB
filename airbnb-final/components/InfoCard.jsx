import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import {HeartIcon} from "@heroicons/react/outline";
import {StarIcon} from "@heroicons/react/solid"
import { ST } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Axios from "axios";
import { Button } from '@mui/material';
import CancelModal from './CancelModal';
function InfoCard({item, show,state,listed}) {
    // console.log(item.property_id,listed)
    const text=listed===0?"List property":"Unlist property"
    const ci=item.wishlist_id===null?0:1;
    const [cIndex,setCIndex]=useState(ci);
    const [showModal,setShowModal]=useState(false)
    const color=['gray','red']
    const router=useRouter();
    const [user_id,setUserId]=useState('')
    const [images, setImages] = useState([]);
    function cancel(){
        setShowModal(false)
      }
      console.log(item)
      function confirm(booking_id,property_id){
        Axios.post("http://localhost:3003/removeBooking",{
          userId:user_id,
          property_id:property_id,
          booking_id:booking_id
        }).then((response)=>{
          if(response.data.status==='Done'){
            alert('Booking Has been cancelled')
          }
          else{
            alert('Please try again')
          }
        })
      }
    function changeToggle(){
        setShowModal(!showModal)
      }
      function propMan(property_id, listed){
        console.log(listed);
        if (listed===0){
          list(property_id);
        } else{
          remove(property_id);
        }
      }
  
      function remove(property_id){
        Axios.post("http://localhost:3003/removeProp", {
          property_id: property_id,
        })
        .then((response) => {
          if(response.data.status==='Done'){
            alert('Property has been unlisted')
          }
          else{
            alert('Please try again')
          }
        })
      }
      function cancel(){
        setShowModal(false)
      }
      function list(property_id){
        Axios.post("http://localhost:3003/listProp", {
          property_id: property_id,
        })
        .then((response) => {
          if(response.data.status==='Done'){
            alert('Property has been listed')
          }
          else{
            alert('Please try again')
          }
        })
      }
    function goToProp(){
        if(show===false){
            return;
        }
        router.push({
            pathname: '/property',
            query:{
                property_id:item.property_id
            }
        })
    }
    function changeColor(){
        if(cIndex===0){
            setCIndex(1)
        }
        else{
            setCIndex(0)
        }
        console.log("98",item.property_id)
        Axios.post("http://localhost:3003/addRemoveWishlist",{
            user_id:user_id,
            property_id:item.property_id,
            state:cIndex
        }).then((response)=>{
            console.log(response.data)
        })
    }
    function deleteProp(property_id){
      Axios.post("http://localhost:3003/deleteProperty",{
        property_id:property_id
      }).then((response)=>{
        if(response.data.status==="Done"){
          alert("The property is successfully deleted")
        }
        else{
          alert("An error occurred while deleting the property")
        }
      })
    }
    useEffect(()=>{
        if (typeof window!=='undefined'){
            setUserId(JSON.parse(sessionStorage.getItem('user_info')).user_id);
        }
    },[])
    console.log(item);
    const notFound = '/images/airbnb2.webp'

    useEffect(() => {
        Axios.post("http://localhost:3003/getImages", {
            property_id: item.property_id
        })
        .then((response) => {
            setImages(prev => {
                return [...prev, ...response.data]
            })
        })
    }, [])

  return (
    <div  className='flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t'>
        <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
            <Image src={images.length===0?notFound:images[0]?.image_url} layout='fill' objectFit='cover'/>
        </div>
        <div className='flex flex-col flex-grow pl-5'>
            <div className='flex justify-between'>
                <p>In {item.city}, {item.country}</p>
                <FavoriteIcon onClick={changeColor} sx={{"&:hover":{color:"red"},color:color[cIndex]}} className='h-7 cursor-pointer'/>
            </div>
            <div onClick={goToProp}>
            <h4 className='text-xl'>{item.property_name}</h4>
            <div className='border-b w-10 pt-2'/>

            <p className='pt-2 text-sm text-gray-500 flex-grow'>{item.description}</p>

            <div className='flex justify-between items-end pt-10'>
                <p className='flex items-center'>
                    <StarIcon className='h-5 text-red-400'/>4.5
                </p>
                <div>
                    <p className='text-lg lg:text-2xl pd-2'>
                     ₹ {item.price_per_night} / night
                    </p>
                    {show===true && <p className='text-right font-extralight'>
                     ₹ {item.price_per_night*item.noOfDays} total
                    </p>}
                    {show===false?state===0?<p>
                        <Button onClick={changeToggle} variant="outlined">Cancel Booking</Button>
                    </p>:<p>
                        <Button onClick={changeToggle} variant="outlined">{text}</Button>
                    </p>:""}
                    {state===0?<CancelModal confirm={confirm} deleteProp={null} cancel={cancel} isVisible={showModal} property_title={item.property_name} booking_id={item.booking_id} property_id={item.property_id} listed={null} state={0}/>:<CancelModal confirm={propMan} deleteProp={deleteProp} cancel={cancel} isVisible={showModal} property_title={item.property_name} booking_id={item.booking_id} property_id={item.property_id} listed={listed} state={1}/>}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default InfoCard