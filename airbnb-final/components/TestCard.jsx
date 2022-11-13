import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import Link from  'next/link';
import Image from 'next/image';
import { Carousel } from "flowbite-react";

function TestCard() {
    const [properties,setProperties] = useState({});
    const fetchProperties = async ()=>{
        const res = await axios.get('http://localhost:3003/showproperty');
        setProperties(res.data);
    }
    useEffect(()=>{
        fetchProperties();
    },[]);
    const handleChildElementClick = (e) => {
        e.stopPropagation()
        // Do other stuff here
    }
    const renderedProperties =Object.values(properties).map((property)=>{

        const images = JSON.parse(property.images);

        return (
            <Link legacyBehavior key={property.property_id} href="#">
                <a>
                <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                    <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                        <Carousel slide = {false}>
                            {
                                images.map(img=>(
                                    <img src={img.url} alt="..." className='carousel'/>
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
            </Link>
        )
    });
    return <>
        {renderedProperties}
    </>
}

export default TestCard