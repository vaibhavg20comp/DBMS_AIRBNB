import React, { useEffect } from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link as MUILink} from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useContext } from 'react';

import {UserContext} from "../_app";

// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         <MUILink color="inherit" href="https://github.com/curiyash/dbms-airbnb">
//           GitHub
//         </MUILink>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
// }

const theme = createTheme();

function Login() {
    const {user, setUser} = useContext(UserContext);
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [color, setColor] = useState('primary');
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined'){
            const obj = sessionStorage.getItem('user_info');
            if (obj!==null){
                router.push("/");
            }
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email==="" || password===""){
            alert("Please enter both the username and password")
            return
        }
        Axios.post('http://localhost:3001/api/login', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
            if (response.data.status!==true){
                alert(response.data.status)
            } else{
                setUser(response.data)
                console.log(response.data);
                sessionStorage.setItem('user_info', JSON.stringify(response.data));
                router.push({
                    pathname: '/',
                });
            }
            // navigate('/home', {user_id: response.data.user_id, username: response.data.username, isHost: response.data.isHost.data[0]})
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <ThemeProvider theme={theme}>
    <Grid container component="main" className='login-form' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
            backgroundImage: `url(images/airbnb2.webp)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
            Sign in to find a Home Far From Home...
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid> */}
                <Grid item>
                <Button href="/Login/signup" variant="text">
                    {"Don't have an account? Sign Up"}
                </Button>
                </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
        </Box>
        </Grid>
    </Grid>
    </ThemeProvider>
    )
}

export default Login
