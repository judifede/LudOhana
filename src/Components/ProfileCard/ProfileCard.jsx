import { AccountCircle } from '@mui/icons-material'
import './ProfileCard.css'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material'

function ProfileCard() {
  const name = 'Super'
  const lastname = 'Yoelito'
  const email = 'SuperYoelito@gmail.com'
  const description = 'Me gusta ..... y .....'
  const address = 'Schamann'

  return (
    <Card
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible',
        paddingTop: '50px',
      }}
    >
      <CardHeader title={name + ' ' + lastname} />
      <CardContent>
        <AccountCircle className="profileImg" sx={{ fontSize: '100px' }} />
          <p>{email}</p>
          {description && <p>{description}</p>}
          {address && <p>{address}</p>}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" color="success">
          Editar
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProfileCard
