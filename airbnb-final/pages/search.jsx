import AppHeader from "../components/AppHeader";
import Hero from "../components/Hero";
import AppSection from "../components/AppSection";
import SearchHero from "../components/SearchHero";
import { useRouter } from "next/router";
import {format} from "date-fns"
import axios from "axios";
import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import React from 'react'
import Box from '@mui/material/Box';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Container} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {filters} from "/data/filters"
function search({searchResults}){
    const [results,setResults]=useState(searchResults);
    const router=useRouter();
    const [location,setLocation]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [range,setRange]=useState('');
    const [noOfPpl,setNoOfPpl]=useState(10);
    const [data,setData]=useState([]);
    const [tabValue,setTabValue]=useState(-1);
    const removeFilters=()=>{
        setResults(searchResults);
    }
    const changeTabValue=(event,newValue)=>{
        function checkFilter(item){
            return item.amenities.includes(filters[newValue].label)
        }
        setResults(searchResults.filter(checkFilter));
    }
  
    useEffect(()=>{
        if(router.isReady){
            setLocation(router.query.location);
            setCheckIn(router.query.checkIn);
            setCheckOut(router.query.checkOut);
            setNoOfPpl(router.query.guests);
            console.log(checkIn);
            console.log(checkOut)
            const sd=checkIn.split('T')[0]
            const ed=checkOut.split('T')[0]
            setRange(`${sd} to ${ed}`);
        }
        
    },[router.isReady,location,checkIn,checkOut,range])
    
    return (
        <>
            <AppHeader />
            <main>
                <SearchHero />
                <section className="pt-14 px-6">
                <p>300+ Stays -- {range} -- for {noOfPpl} guests</p>
                <h1 className="text-3xl mt-2 mb-6">Stays in {location}</h1>
                <Container maxWidth="xl">
                    <Box sx={{display:"flex",flexGrow:1,px:{xs:0,md:2},alignItems:'center',mt:2,mb:2}}>
                    <Tabs
                    value={tabValue}
                    onChange={changeTabValue}
                    variant="scrollable"
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]:{
                            '&.Mui-disabled':{opacity:0.3},
                        },
                    }}
                    TabIndicatorProps={{style:{background:'#FF385C'}}}>
                        {
                        filters.map(item=>{
                            return <Tab key={item.id} icon={item.icon} label={item.label} />;
                        }) 
                        }
                    </Tabs>
                    <RemoveCircleIcon className="cursor-pointer" onClick={removeFilters} size={24}/>
                    </Box>
                </Container>
                <div className="flex flex-col">
                {results.map(item => (
                    <InfoCard key={item.property_id} item={item} show={true}/>
                ))}
                </div>
                </section>
            </main>
        </>
    )
}
export default search;

export async function getServerSideProps(context){
    
    const searchResults=await axios.get("http://localhost:3003/searchResults",{params:{guests:context.query.guests,location:context.query.location,checkIn:context.query.checkIn,checkOut:context.query.checkOut}}).then((response)=>{
        return response.data;
    })
    console.log(searchResults)
    return{
        props:{
            searchResults
        }
    }
}