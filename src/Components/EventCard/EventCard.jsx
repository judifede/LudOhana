import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { CalendarMonth, Groups, LocationOn } from '@mui/icons-material'

import imageUrl from "../../assets/FiestadeBurbujas.webp"
import { Link } from 'react-router-dom'

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" }
    console.log(date)
    const fecha = new Date(date)
    return fecha.toLocaleString('es-ES', options) + 'h'
}


const EventCard = (
    { event: { title, dateStart, dateEnd, addressTitle, addressUrl, participants } }
) => {

    return (

        <Box className={'cardHover'} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', p: 3 }}>
            <Card sx={{ maxwidth: '100%', width: '400px', maxHeight: '100%', minHeight: '500px' }} elevation={4}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent sx={{ p: 3 }}>

                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', pb: 1 }}>
                        {title}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarMonth />

                            <Typography variant="body1" color="text.main">
                                <strong>Inicio:</strong> {formatDate(dateStart)}
                            </Typography>

                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pb: 1 }}>
                            <CalendarMonth />
                            <Typography variant="body1" color="text.main">
                                <strong>Fin:</strong> {formatDate(dateEnd)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn />
                                <Link
                                    to={addressUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    style={{ color: '#FF8000', textDecoration: 'underline' }}
                                >
                                    <Typography variant="body1" color='text.main' sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                    }} >
                                        {addressTitle}
                                    </Typography>
                                </Link>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Groups />
                                <Typography variant="body1" color="text.main">
                                    <strong>Participantes:</strong>{participants}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.1 }}>
                        <Button variant="contained" color="success">
                            Info
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>


    )
}

export default EventCard