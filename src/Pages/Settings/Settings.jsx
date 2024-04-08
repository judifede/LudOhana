import {Box,Typography,Card,CardHeader,CardContent,InputAdornment,Icon} from '@mui/material'
import {Construction,VolunteerActivism,CalendarMonth} from '@mui/icons-material'
import "./Settings.css"
function Settings() {
  return (
   <Box className="content">
     <Typography id="modal-title" variant="h3" component="h2" textAlign="center">
           Panel De Gestión
     </Typography>

     <Box className="options">

       <Card className="section cardHover">
         <CardHeader title="Materiales" sx={{ textAlign: 'center' }} />
         <CardContent>
           <InputAdornment position="start" sx={{ width:'100%', height:"90%", marginTop:"10%"}}>
                  <Icon sx={{ width:'100%', height:"50%", marginTop:"10%"}}>
                    <Construction sx={{ fontSize: "100px"}}/>
                  </Icon>
           </InputAdornment>
         </CardContent>
       </Card>

       <Card className="section cardHover">
         <CardHeader title="Donaciones" sx={{ textAlign: 'center' }} />
         <CardContent>
           <InputAdornment position="start" sx={{ width:'100%', height:"90%", marginTop:"10%"}}>
                  <Icon sx={{ width:'100%', height:"50%", marginTop:"10%"}}>
                    <VolunteerActivism sx={{ fontSize: "100px"}}/>
                  </Icon>
           </InputAdornment>
         </CardContent>
       </Card>

       <Card className="section cardHover">
         <CardHeader title="Eventos" sx={{ textAlign: 'center' }} />
         <CardContent>
           <InputAdornment position="start" sx={{ width:'100%', height:"90%", marginTop:"10%"}}>
                  <Icon sx={{ width:'100%', height:"50%", marginTop:"10%"}}>
                    <CalendarMonth sx={{ fontSize: "100px"}}/>
                  </Icon>
           </InputAdornment>
         </CardContent>
       </Card>
     </Box>
    
   </Box>
  )
}

export default Settings
