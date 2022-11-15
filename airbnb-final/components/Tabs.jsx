import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import InfoCard from './InfoCard';
import { Grid } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BookedProps({user_id}){
    const [props, setProps] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:3003/getBookedProps", {
            user_id: user_id,
        })
        .then((response) => {
            console.log(response.data);
            response.data.props.forEach((property) => {
                setProps(prev => {
                    return [...prev, property]
                })
            })
        })
    }, [user_id])
    
    return (
        <>
            {props.map((prop, index) => {
                return <InfoCard key={index} item={{'item': prop}} show={false}/>
            })}
        </>
    )
}

function HostedProps({user_id}){
    const [props, setProps] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:3003/getHostedProps", {
            user_id: user_id,
        })
        .then((response) => {
            response.data.props.forEach((property) => {
                setProps(prev => {
                    return [...prev, property]
                })
            })
        })
    }, [user_id])
    
    return (
        <>
            {props.map((prop, index) => {
                return <InfoCard key={index} item={{'item': prop}} show={false}/>
            })}
        </>
    )
}

function Wishlist({user_id}){
    useEffect(() => {
        Axios.post("http://localhost:3003/getWishlist", {
            user_id: user_id,
        })
        .then((response) => {
            console.log(response);
        })
    }, [])
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState("");

  useEffect(()=>{
    if (typeof window!=='undefined'){
        setUser(JSON.parse(sessionStorage.getItem('user_info')));
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%', margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Tab label="Booked Properties" {...a11yProps(0)} sx={{flex: 0.33}}/>
          <Tab label="Hosted Properties" {...a11yProps(1)} sx={{flex: 0.33}}/>
          <Tab label="Wishlist" {...a11yProps(2)} sx={{flex: 0.33}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Booked Properties
        <BookedProps user_id={user.user_id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Hosted Properties
        <HostedProps user_id={user.user_id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Wishlist
      </TabPanel>
    </Box>
  );
}