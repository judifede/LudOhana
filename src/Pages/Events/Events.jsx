import { Grid } from '@mui/material'
import EventCardList from '../../Components/EventCardList/EventCardList'

function Events() {
  return (
    <Grid
      item
      sx={{ marginTop: "20px" }}
      xs={12}
    // sm={6} md={3} lg={3} xl={2.4}
    >
      <EventCardList />
    </Grid>
  )
}

export default Events
