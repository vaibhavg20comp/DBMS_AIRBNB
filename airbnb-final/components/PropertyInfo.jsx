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

function Amenity({amenities}){
    return (
        <>
            {amenities.map((amenity) => {
                return (
                    <Grid container sx={{width: "80%"}} direction="row" alignItems={"center"} spacing={3}>
                    <Grid item>
                        Icon
                    </Grid>
                    <Grid item>
                        <Grid item>
                            {amenity.amenity}
                        </Grid>
                        <Grid item>
                            {amenity.description}
                        </Grid>
                    </Grid>
                    </Grid>
                )
            })}
        </>
    )
}

function Rule({rules}){
    return (
        <>
            {rules.map((rule) => {
                return (
                    <Grid container sx={{width: "80%"}} direction="row" alignItems={"center"} spacing={3}>
                    <Grid item>
                        Icon
                    </Grid>
                    <Grid item>
                        <Grid item>
                            {rule.rule}
                        </Grid>
                        <Grid item>
                            {rule.description}
                        </Grid>
                    </Grid>
                    </Grid>
                )
            })}
        </>
    )
}

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
    },[])

    return (
        <>
            <Box sx={{margin: "auto", width: "80%", borderStyle: "solid", borderRadius: "2px"}}>
                {propertyInfo?.firstname!=="undefined" && 
                <Typography variant="h4">
                    Hosted by {propertyInfo.firstname}
                </Typography>}
                <Grid container direction="row" spacing={5}>
                    <Grid item>
                        Guests <br></br> {propertyInfo.max_occ}
                    </Grid>
                    <Grid item>
                        Bedrooms <br></br> {propertyInfo.num_bedrooms}
                    </Grid>
                    <Grid item>
                        Beds <br></br> {propertyInfo.num_beds}
                    </Grid>
                    <Grid item>
                        Bathrooms <br></br>{propertyInfo.num_bathroom}
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                >
                    <Grid item sx={{width: "60%"}}>
                        {amenities.length!==0 && 
                        <>
                            <Grid item>
                                <Typography variant="h5">
                                    Amenities
                                </Typography>
                            </Grid>
                            <Grid item direction="column">
                                <hr></hr>
                                <Amenity amenities={amenities}/>
                                <hr></hr>
                            </Grid>
                        </>}
                        <Grid item>
                            <Typography variant="h5" sx={{textDecoration: "underline"}}>Property Description</Typography>
                           {propertyInfo.description}
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" sx={{textDecoration: "underline"}}>House Rules</Typography>
                            <hr></hr>
                            <Rule rules={rules}/>
                            <hr></hr>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "40%"}}>
                        <BookingCard property_id={property_id}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}