import React from 'react'
import Box from '@mui/material/Box';
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from '@mui/material';
import Container from '@mui/material';
import {FaFilter} from "react-icons/fa"
import {filters} from "/data/filters"
function FilterTab() {
  return (
    <Container maxWidth="xl">
        <Box sx={{display:"flex",flexGrow:1,px:{xs:0,md:2},alignItems:'center',mt:2,mb:2}}>
        <Tabs
        
        variant="scrollable"
        scrollButtons
        sx={{
            [`& .${tabsClasses.scrollButtons}`]:{
                '&.Mui-disabled':{opacity:0.3},
            },
        }}>
            {
               filters.map(item=>{
                return <Tab key={item.id} icon={item.icon} label={Tab.label} />;
               }) 
            }
        </Tabs>

        </Box>
    </Container>
  )
}

export default FilterTab