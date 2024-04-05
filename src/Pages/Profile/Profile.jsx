import './Profile.css'
import { Grid } from '@mui/material'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'

function Profile() {
  return (
    <Grid
      item
      className={'cardHover'}
      sx={{marginTop: "20px"}}
      xs={3}
      // sm={6} md={3} lg={3} xl={2.4}
    >
      <ProfileCard />
    </Grid>
  )
}

export default Profile
