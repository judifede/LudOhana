import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'

import imageUrl from "../../assets/FiestadeBurbujas.webp"
import { Link } from 'react-router-dom';
const EventCard = (
    // { title, dateStart, dateEnd, info, address, registered, imageUrl, addressUrl }
) => {
    const title = "Fiesta de Burbujas"
    const dateStart = '2024-06-10 09:00h'
    const dateEnd = '2024-07-10 09:00h'
    const info = "info"
    const address = "Parque Santa Catalina"
    const addressUrl = "https://www.google.es/maps/place/Parque+de+Santa+Catalina/@28.1404515,-15.4336208,17z/data=!3m1!4b1!4m6!3m5!1s0xc40953ff404d0b9:0x1ef2945b25e43e47!8m2!3d28.1404468!4d-15.4310459!16s%2Fg%2F11hdvdqcdl?entry=ttu"
    const inscribed = "20"
    const participants = "50"
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '30px' }}>
            <Card sx={{ width: '100%' }} elevation={4}>
                <CardMedia
                    component="img"
                    /*  border='1px' */
                    height="250"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent sx={{ padding: '20px', paddingBottom: '0' }}>

                    <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                        {title}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <CalendarMonth />
                            <Typography variant="body2" color="text.main"> {/* date start */}
                                {'Inicio' + ' ' + dateStart}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <CalendarMonth />
                            <Typography variant="body2" color="text.main"> {/* Date end */}
                                {' Fin ' + dateEnd}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Link to={addressUrl} target='_blank' rel='noopener noreferrer' >

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

                                    <LocationOn />
                                    <Typography variant="body2" sx={{ color: 'warning' }}  >
                                        {address}
                                    </Typography>
                                </Box>
                            </Link>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Groups />
                                <Typography variant="body2" color="text.main">
                                    {inscribed + ' / ' + participants}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                        <Button variant="contained" color="success">
                            {info}
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>


    )
}

export default EventCard