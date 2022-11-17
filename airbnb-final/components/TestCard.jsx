import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import Link from  'next/link';
import Image from 'next/image';
import { Carousel } from "flowbite-react";
import { useRouter } from 'next/router';

function TestCard() {
    const [properties,setProperties] = useState({});
    const router = useRouter();
    const fetchProperties = async ()=>{
        const res = await axios.get('http://localhost:3003/showproperty');
        setProperties(res.data);
    }
    useEffect(()=>{
        fetchProperties();
    },[]);
    const handleChildElementClick = (e) => {
        e.stopPropagation();
        // Do other stuff here
        // Currently clicking on a carousel as well as next arrow we are redirected to the property page
        //Since anchor tag is a parent div we have to disable this behaviour when we click on arrows.
    }
    const renderedProperties =Object.values(properties).map((property)=>{

        const images = property.images;
        // const images = [];

        return (
                <a onClick={(e) => {router.push({
                    pathname: '/property',
                    query:{
                        property_id:property.property_id
                    }
                })}}>
                <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                    <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                        <Carousel slide = {false}>
                            {
                                images.map(img=>(
                                    <img key= {img.image_id} src={img.url==='undefined'?"images/airbnb2.webp":img.url} alt="..." className='carousel'/>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div>
                        <h3 className="font-medium leading-5 text-gray-500 text-md md:text-md">
                            {property.city + ',' + property.country}
                        </h3>
                        {/* <h3 className="font-medium leading-5 text-gray-500 text-md md:text-md">
                            {property.av_from_date + '-' + property.av_to_date}
                        </h3> */}
                        <h2 className="font-medium leading-5 text-gray-500 text-md md:text-md">
                            {'₹'+property.price_per_night+ ' per night'}
                        </h2>
                    </div>
                </div>
            </a>
        )
    });
    return <>
        {renderedProperties}
    </>
}

export default TestCard