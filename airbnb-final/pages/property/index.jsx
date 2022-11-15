import { Grid } from '@mui/material'
import AppHeader from '../../components/AppHeader'
import PropertyImage from '../../components/PropertyImage'
import PropertyInfo from '../../components/PropertyInfo'
import BookingCard from '../../components/BookingCard'
import { useRouter } from 'next/router'
import Axios from "axios"
import { useState,useEffect } from 'react'
import axios from 'axios'
import SearchHero from '../../components/SearchHero'

export default function Property({propertyinfo}){
    const router = useRouter();
    const [property_id,setProperty_id]=useState(router.query.property_id);
    const [propertyInfo, setPropertyInfo] = useState(propertyinfo);

    useEffect(() => {
        console.log("18:",property_id)
        if(router.isReady){
            setProperty_id(router.query.property_id)
            Axios.post("http://localhost:3003/api/property_info", {
                property_id: router.query.property_id
            })
            .then((response) => {
                console.log(response);  
                setPropertyInfo(response.data)
            })
        }

    }, [router.isReady])
    console.log("30:",property_id)
    return (
        <>
            <AppHeader user_info={{firstname: "Yash"}} searchPage={false}></AppHeader>
            <main>
                <SearchHero />
                <Grid
                container
                direction="column"
                spacing={5}
                sx={{marginTop: "65px"}}
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
            </main>
        </>
    )
}

export async function getServerSideProps(context){
    const propertyinfo=await axios.post("http://localhost:3003/api/property_info",{property_id: context.query.property_id
    }).then((response)=>{
        return response.data
    })
    return {
        props:{
            propertyinfo
        }
    }
}
