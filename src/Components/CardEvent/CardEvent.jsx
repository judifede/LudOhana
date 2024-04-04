import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const EventCard = (
    // { title, date, description, address, registered, imageUrl }
    ) => {
    const title = "titulo"
    const date = "date"
    const description = "description"
    const address = "address"
    const participants = "resgistered"
    const imageUrl = "img"
    return (
        <Box>
            <Card sx={{ width:'250px', height:'350px' }}>
                <CardMedia
                    component="img"
                    border= '1px'
                    height="150"
                    image={imageUrl}
                    alt={title}
                />

                <CardContent>

                    <Typography gutterBottom variant="h5" /* component="div" */ sx={{ textAlign: 'center'}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.main">
                        {date}
                    </Typography>
                    <Typography variant="body2" color="text.main">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.main">
                        {participants}
                    </Typography>
                    <Typography variant="body2" color="text.main">
                        {address}
                    </Typography>
                </CardContent>
            </Card>

        </Box>


    )
}

export default EventCard