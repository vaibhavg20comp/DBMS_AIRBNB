import Box from '@mui/material/Box';
import Image from 'next/image';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppHeader from './AppHeader';
import { Grid, Typography } from '@mui/material';
import BookingCard from './BookingCard';
import {useRouter} from "next/router";

function Amenity(){
    return (
        <Grid container sx={{width: "80%"}} direction="row" alignItems={"center"} spacing={3}>
            <Grid item>
                Icon
            </Grid>
            <Grid item>
                <Grid item>
                    Description
                </Grid>
                <Grid item>
                    Description
                </Grid>
            </Grid>
        </Grid>
    )
}

export default function PropertyInfo({property_id}){
    const router = useRouter();

    useEffect(() => {
        Axios.post("http://localhost:3001/api/property_info", {
            property_id: property_id
        })
        .then((response) => {
            console.log(response);
        })
    }, [])
    
    return (
        <>
            <Box sx={{margin: "auto", width: "80%", borderStyle: "solid", borderRadius: "2px"}}>
                <Typography variant="h4">
                    Hosted by (Owner name)
                </Typography>
                <Grid container direction="row" spacing={5}>
                    <Grid item>
                        Guests
                    </Grid>
                    <Grid item>
                        Bedrooms/Beds
                    </Grid>
                    <Grid item>
                        Bathrooms
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                >
                    <Grid item sx={{width: "60%"}}>
                        <Grid item>
                            <Typography variant="h5">
                                Amenities
                            </Typography>
                        </Grid>
                        <Grid item direction="column">
                            <hr></hr>
                            <Amenity />
                            <Amenity />
                            <Amenity />
                            <hr></hr>
                        </Grid>
                        <Grid item>
                            Property Description
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: "40%"}}>
                        <BookingCard />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}