import { Grid } from '@mui/material'
import AppHeader from '../../components/AppHeader'
import PropertyImage from '../../components/PropertyImage'
import PropertyInfo from '../../components/PropertyInfo'
import BookingCard from '../../components/BookingCard'

export default function Property(){
    return (
        <>
            <AppHeader user_info={{firstname: "Yash"}} searchPage={false}></AppHeader>
            <Grid
                container
                direction="column"
                spacing={5}
                sx={{marginTop: "200px"}}
            >
                <Grid item>
                    <PropertyImage />
                </Grid>
                <Grid item>
                    <PropertyInfo />
                </Grid>
            </Grid>
        </>
    )
}
