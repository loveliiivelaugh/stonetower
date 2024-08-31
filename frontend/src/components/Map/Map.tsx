import { Button, Grid, Typography } from '@mui/material';
import Map from 'react-map-gl';

export default function Mapbox() {
    return (
        <Grid container mt={14}>
            <Grid item xs={12} sm={8} px={2}>
                <Map
                    mapLib={import('mapbox-gl')}
                    initialViewState={{
                        longitude: -100,
                        latitude: 40,
                        zoom: 3.5
                    }}
                    style={{width: 600, height: 400}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken="pk.eyJ1IjoiZGF0YXNjaWVuY2VkYWQiLCJhIjoiY2xrZTB0M2kzMHYwajNkcGo3NTR2ZDNkeCJ9.Ky8kEvKGsaafXuG9B5LSvg"
                />
            </Grid>
            <Grid item xs={12} sm={4} px={2}>
                <Typography variant="h5">Location's</Typography>
                <Typography variant="h6">More location's coming soon!</Typography>
                <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
                <Button variant="contained" color="error" sx={{ m: 1 }}>Make a Reservation</Button>
            </Grid>
        </Grid>
    )
}