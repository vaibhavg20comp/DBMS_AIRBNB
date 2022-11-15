import React from "react";
import 'react-phone-number-input/style.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import {Link as MUILink} from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";
import PhoneInput from "react-phone-number-input"
import PhoneNumber from "../../components/PhoneNumber";
import { useRouter } from "next/router";
var uuid = require('uuid');

const theme = createTheme();

export default function SignUp(){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [color, setColor] = useState('primary');
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    
    const [dob, setDOB] = useState();
    const [phone, setPhoneNumber] = useState();
    const [email, setEmail] = useState("");

    const [fName, setFName] = useState("");
    const [mName, setMName] = useState("");
    const [lName, setLName] = useState("");

    const date = new Date();
    const [value, setValue] = React.useState(dayjs(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`));

  const handleChange = (newValue) => {
    setDOB(`${newValue.$y}-${newValue.$M}-${newValue.$D}`)
    setValue(newValue);
  };

  const router = useRouter();

  function handleSubmitSignUp(e){
    e.preventDefault();
    console.log(uuid.v4());
    console.log(dob);
    console.log(phone);
    Axios.post('http://localhost:3001/api/signup', {
        user_id: uuid.v4(),
        email: email,
        password: password,
        phone: phone,
        firstname: fName,
        middlename: mName,
        lastname: lName,
        dob: dob
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status!==true){
            alert(response.data.status)
        } else{
            submit();
            router.push("/");
        }
        // navigate('/home', {user_id: response.data.user_id, username: response.data.username, isHost: 0})
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function submit(){
    sessionStorage.setItem('user_info', JSON.stringify({
        user_id: uuid.v4(),
        email: email,
        password: password,
        phone: phone,
        firstname: fName,
        middlename: mName,
        lastname: lName,
        dob: dob,
        isHost: 0,
    }))
    router.push('/');
  }

  return (  
        <ThemeProvider theme={theme}>
            <Grid container component="main" className='login-form' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={6.5}
                sx={{
                    backgroundImage: `url(../images/airbnb1.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5.5} elevation={6} square sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up today and travel the world like it is  your home...
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmitSignUp} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        autoComplete="Email"
                        autoFocus
                    />
                    <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fName"
                                label="First name"
                                name="fName"
                                onChange={(e) => {setFName(e.target.value)}}
                                autoComplete="First name"
                                autoFocus
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="mName"
                                label="Middle name"
                                name="mName"
                                onChange={(e) => {setMName(e.target.value)}}
                                autoComplete="Middle name"
                                autoFocus
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lName"
                                label="Last name"
                                name="lName"
                                onChange={(e) => {setLName(e.target.value)}}
                                autoComplete="Last name"
                                autoFocus
                                />
                        </Grid>
                    </Grid>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    helperText={isFormInvalid && "Password does not match"}
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    color={color}
                    autoComplete="current-password"
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />
                    <Grid container direction="row" alignItems={"center"} justifyContent={"space-between"} spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                        <LocalizationProvider margin="normal" dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} margin="normal"
                            required
                            fullWidth/>}
                            />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="IN"
                                value={phone}
                                onChange={setPhoneNumber}
                                inputComponent={PhoneNumber}
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container>
                    {/* <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid> */}
                    <Grid item>
                        <Button href="/Login" variant="text">
                        {"Already a member? Sign In"}
                        </Button>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Grid>
            </Grid>
        </ThemeProvider>
    )
}
