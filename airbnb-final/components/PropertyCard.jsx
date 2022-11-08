import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import axios from "axios";
// import ImageCarousel from "./ImageCarousel";


const  PropertyCard= () => {
    const [properties,setProperties] = useState({});
    const fetchProperties = async ()=>{
        const res = await axios.get('http://localhost:3003/showproperty');
        setProperties(res.data);
    }
    useEffect(()=>{
        fetchProperties();
    },[])
    const renderedProperties =Object.values(properties).map((property)=>{
        return (
            <Link key={property.property_id} href="#">
                
                    <div className="p-2 duration-300 lg:p-3 gap-y-4 active:scale-105 active:bg-gray-200 active:bg-opacity-40 rounded-xl">
                        <div className="relative w-full h-40 mb-2 md:h-60 lg:h-72">
                            <Image
                                src={property.image_url}
                                alt={property.property_name}
                                fill
                                style = {{ objectFit:'cover' }}
                                className="rounded-xl"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium leading-5 text-gray-500 text-md md:text-xl">
                                {property.city + ',' + property.country}
                            </h3>
                        </div>
                    </div>
                
            </Link>
        )
    });
    console.log(properties);
    
    return <div>
        {/* {renderedProperties} */}
    </div>
}

export default PropertyCard