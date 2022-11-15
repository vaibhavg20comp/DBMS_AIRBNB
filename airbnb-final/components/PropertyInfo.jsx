import Box from '@mui/material/Box';
import Image from 'next/image';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppHeader from './AppHeader';
import { useEffect, useState } from 'react';
import Axios from "axios"
import { Grid, Typography, Button } from '@mui/material';
import BookingCard from './BookingCard';
import {useRouter} from "next/router";
import PropertyTabs from './PropertyTabs';
import { filters } from '/data/filters';
import { iconMap } from '../utils/Enums';

function Test(){
    Axios.get("http://localhost:3003/searchResults")
    .then((response) => {
        console.log(response);
    })
}

export default function PropertyInfo({propertyInfo, property_id}){
    const router = useRouter();
    // const property_id = router.query.property_id;
    const [amenities, setAmenities] = useState([]);
    const [rules,setRules] = useState([]);
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        Axios.post("http://localhost:3003/getAmenities", {
            property_id: property_id,
        })
        .then((response) => {
            console.log(response.data);
            response.data.forEach((amenity) => {
                console.log(amenity);
                setAmenities(prev => {
                    return [...prev, amenity];
                })
            })
        })

        Axios.post("http://localhost:3003/getRules", {
            property_id: property_id,
        })
        .then((response) => {
            console.log(response.data);
            response.data.forEach((rule) => {
                setRules(prev => {
                    return [...prev, rule];
                })
            })
        })
        setIsSSR(false);
    },[])

    if (isSSR){
        return
    } else{
        return (
            <>
                <Box sx={{margin: "auto", width: "80%", borderStyle: "solid", borderRadius: "2px"}}>
                    {propertyInfo?.firstname!=="undefined" && 
                    <Typography variant="h4">
                        Hosted by {propertyInfo.firstname}
                    </Typography>}
                    <Grid container direction="row" spacing={5}>
                        <Grid item direction="column" sx={{textAlign: 'center', marginLeft: '2px'}}>
                            <Grid item>
                                Guests
                            </Grid>
                            <Grid>
                                {propertyInfo.max_occ}
                            </Grid>
                        </Grid>
                        <Grid item direction="column" sx={{textAlign: 'center'}}>
                            <Grid item>
                                Bedrooms
                            </Grid>
                            <Grid item>
                                {propertyInfo.num_bedrooms}
                            </Grid>
                        </Grid>
                        <Grid item direction="column" sx={{textAlign: 'center'}}>
                            <Grid item>
                                Beds
                            </Grid>
                            <Grid item>
                                {propertyInfo.num_beds}
                            </Grid>
                        </Grid>
                        <Grid item direction="column"sx={{textAlign: 'center'}}>
                            <Grid item>
                                Bathrooms
                            </Grid>
                            <Grid item>
                                {propertyInfo.num_bathroom}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={5}
                        justifyContent={"space-around"}
                    >
                        <Grid item sx={{width: "60%", minHeight: "420px"}}>
                            <Grid item>
                                <PropertyTabs description={propertyInfo.description} amenities={amenities} rules={rules}/>
                            </Grid>
                        </Grid>
                        <Grid container sx={{width: "40%"}}>
                            <BookingCard property_id={property_id} rate={propertyInfo.price_per_night} property_title={propertyInfo.property_name}/>
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}