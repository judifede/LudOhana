import React from 'react'
import EventCard from '../../Components/EventCard/EventCard'
import { Grid } from '@mui/material'

function Events() {
  return (

    <Grid
      item
      className={'cardHover'}
      sx={{ marginTop: "20px" }}
      xs={3}
    // sm={6} md={3} lg={3} xl={2.4}
    >
      <EventCard />
    </Grid>

  )
}

export default Events
