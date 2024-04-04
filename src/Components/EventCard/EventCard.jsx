import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'

const EventCard = (
    // { title, date, info, address, registered, imageUrl }
) => {
    const title = "titulo"
    const date = "date"
    const info = "info"
    const address = "address"
    const inscribed = "20"
    const participants = "50"
    const imageUrl = "img"
    return (
        <Box>
            <Card sx={{ width: '250px', height: '350px' }} elevation={4}>
                <CardMedia
                    component="img"
                    border='1px'
                    height="150"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent sx={{padding:'20px'}}>

                    <Typography gutterBottom variant="h5" /* component="div" */ sx={{ textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CalendarMonth /> {/* Icono de calendario */}
                        <Typography variant="body2" color="text.main">
                            {date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

                            <LocationOn />
                            <Typography variant="body2" color="text.main">
                                {address}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Groups />
                            <Typography variant="body2" color="text.main">
                                {inscribed + ' / ' + participants}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{justifyContent:'center'}}>

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