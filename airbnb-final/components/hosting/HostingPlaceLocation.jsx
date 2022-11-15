import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function HostingPlaceLocation (){
  const [viewport,setViewport] = useState({
    width:'100%',
    height:'100%',
    latitude:37.7577,
    longitude: -122.4376,
    zoom:8,
  });
  return (
  <section className='min-w-[600px]'>
    <ReactMapGL
    mapStyle='mapbox://styles/vaibhavg20comp/clai2qvq2000214qlka4v6jlt'
    mapboxApiAccessToken='pk.eyJ1IjoidmFpYmhhdmcyMGNvbXAiLCJhIjoiY2xhaHZpOGtoMDN5YjNxbWtuc3I0cGh1ZSJ9.5jVoNxjHjywGAVWnbw_DOw'
    {...viewport}
    >
    </ReactMapGL>
  </section>
)}

