import './Profile.css'
import { Box, Grid } from '@mui/material'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import { useState } from 'react'

function Profile() {

  return (
    <Grid
      item
      sx={{marginTop: "20px"}}
      xs={3}
      // sm={6} md={3} lg={3} xl={2.4}
    >
     
      <ProfileCard />
    </Grid>
  )
}

export default Profile
