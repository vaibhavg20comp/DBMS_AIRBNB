import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function HostingPlaceLocation ({setResponse}){

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip,setZip]  = useState(""); 
  const [addressLine, setAddressLine] = useState("");

  function handleSubmit(e){
    e.preventDefault()
    console.log("Here");
    setResponse({
      city: city,
      state: state,
      country: country,
      zip:zip,
      addressLine: addressLine,
    })
  }

  return (
    <Grid item xs={12} sm={8} md={5} elevation={6}  sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Box
        sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }}
    >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
        <TextField
            margin="normal"
            required
            fullWidth
            name="addressLine"
            label="addressLine"
            type="addressLine"
            id="addressLine"
            onChange={(e) => {setAddressLine(e.target.value)}}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            onChange={(e) => {setCity(e.target.value)}}
            autoComplete="City"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="state"
            label="state"
            type="state"
            id="state"
            onChange={(e) => {setState(e.target.value)}}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="country"
            label="country"
            type="country"
            id="country"
            onChange={(e) => {setCountry(e.target.value)}}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="zip"
            label="zip"
            type="number"
            id="zip"
            onChange={(e) => {setZip(e.target.value)}}
        />
        
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Save
        </Button>
        {/* <Copyright sx={{ mt: 5 }} /> */}
        </Box>
    </Box>
    </Grid>
)}

// Toconfigure map us below format

// export default function HostingPlaceLocation (){
//   const [viewport,setViewport] = useState({
//     width:'100%',
//     height:'100%',
//     latitude:37.7577,
//     longitude: -122.4376,
//     zoom:8,
//   });
//   return (
//   <section className='min-w-[600px]'>
//     <ReactMapGL
//     mapStyle='mapbox://styles/vaibhavg20comp/clai2qvq2000214qlka4v6jlt'
//     mapboxApiAccessToken='pk.eyJ1IjoidmFpYmhhdmcyMGNvbXAiLCJhIjoiY2xhaHZpOGtoMDN5YjNxbWtuc3I0cGh1ZSJ9.5jVoNxjHjywGAVWnbw_DOw'
//     {...viewport}
//     >
//     </ReactMapGL>
//   </section>
// )}

