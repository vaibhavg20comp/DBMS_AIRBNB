import Box from '@mui/material/Box';
import Image from 'next/image';

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppHeader from './AppHeader';
import { Grid, Typography } from '@mui/material';

export default function PropertyImage(){
    return (
        <>
            <Box sx={{margin: "auto", width: "80%", borderStyle: "solid", borderRadius: "2px"}}>
                <Typography variant="h2">
                    Property Name
                </Typography>
                <Grid container direction="row" spacing={5}>
                    <Grid item>
                        Rating
                    </Grid>
                    <Grid item>
                        Reviews
                    </Grid>
                    <Grid item>
                        Location
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <Grid item sx={{width: "50%"}}>
                        <img src="images/airbnb2.webp" style={{objectFit: "cover"}}></img>
                    </Grid>
                    <Grid
                        item
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{width: "50%"}}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item sx={{width: "50%"}}>
                                <img src="images/airbnb2.webp" style={{objectFit: "cover"}}></img>
                            </Grid>
                            <Grid item sx={{width: "50%"}}>
                                <img src="images/airbnb2.webp" style={{objectFit: "cover"}}></img>
                            </Grid>
                            <Grid item sx={{width: "50%"}}>
                            <img src="images/airbnb2.webp" style={{objectFit: "cover"}}></img>
                            </Grid>
                            <Grid item sx={{width: "50%"}}>
                                <img src="images/airbnb2.webp" style={{objectFit: "cover"}}></img>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}