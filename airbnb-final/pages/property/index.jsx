import { Grid } from '@mui/material'
import AppHeader from '../../components/AppHeader'
import PropertyImage from '../../components/PropertyImage'
import PropertyInfo from '../../components/PropertyInfo'
import BookingCard from '../../components/BookingCard'
import { useRouter } from 'next/router'
import Axios from "axios"
import { useState,useEffect } from 'react'

export default function Property(){
    const router = useRouter();
    const property_id = "ABCDEFGHIJKLMNOPQRSTUVWXYZ2121212121";
    const [propertyInfo, setPropertyInfo] = useState({});

    useEffect(() => {
        Axios.post("http://localhost:3001/api/property_info", {
            property_id: property_id
        })
        .then((response) => {
            console.log(response);  
            setPropertyInfo(response.data)
        })
    }, [])

    return (
        <>
            <AppHeader user_info={{firstname: "Yash"}} searchPage={false}></AppHeader>
            <Grid
                container
                direction="column"
                spacing={5}
                sx={{marginTop: "200px"}}
            >
                <Grid item>
                    <PropertyImage property_id={property_id} propertyName={propertyInfo.property_name} city={propertyInfo.city} state={propertyInfo.state} country={propertyInfo.country}/>
                </Grid>
                {propertyInfo.length!==0 && 
                <Grid item>
                    <PropertyInfo property_id={property_id} propertyInfo={propertyInfo}/>
                </Grid>
                }
            </Grid>
        </>
    )
}
