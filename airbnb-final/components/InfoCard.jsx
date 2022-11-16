import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import {HeartIcon} from "@heroicons/react/outline";
import {StarIcon} from "@heroicons/react/solid"
import { ST } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Axios from "axios";
import { Button } from '@mui/material';
function InfoCard({item, show,cancel}) {
    const [cIndex,setCIndex]=useState(0);
    const color=['gray','red']
    const router=useRouter();
    const [user_id,setUserId]=useState('')
    const [images, setImages] = useState([]);

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
        Axios.post("http://localhost:3003/addRemoveWishlist",{
            user_id:user_id,
            property_id:item.property_id,
            state:cIndex
        }).then((response)=>{
            console.log(response.data)
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
                    {show==false?
                    <p>
                        <Button onClick={cancel} variant="outlined">Cancel Booking</Button>
                    </p>:""}
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default InfoCard