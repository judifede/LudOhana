import './Home.css'
import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'

import imageUrl1 from '../../assets/ninoinsecto.jpg'
import imageUrl2 from '../../assets/ninosagua.jpg'
import imageUrl3 from '../../assets/ninaConPerro.webp'

function Home() {
  const CarrouselImgs = [imageUrl1, imageUrl2, imageUrl3]
  const CarrouselHeaders = [
    'Safari de insectos',
    'Descubriendo el mar',
    'Aventura en el Bosque',
  ]
  const CarrouselTexts = [
    '¡Explora el fabuloso mundo de los insectos con actividades y observación!',
    '¡Ven con nosotros y descubre todas las maravillas que el mar nos ofrece!',
    '¡Explora la naturaleza con juegos y diversión para toda la familia!',
  ]
  return (
    <Grid
      item
      sx={{ marginTop: '20px' }}
      xs={10}
      // sm={6} md={3} lg={3} xl={2.4}
    >
      <Carousel
        fullHeightHover={true}
        interval={7000}
        navButtonsProps={{
          style: {
            backgroundColor: '#33333377',
            color: 'white',
            opacity: 1,
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: '0',
            top: 'unset',
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: '10px',
          },
        }}
        NextIcon={<NavigateNext />}
        PrevIcon={<NavigateBefore />}
      >
        {CarrouselImgs &&
          CarrouselImgs.map((img, i) => (
            <Paper key={i} elevation={2}>
              <img
                alt="Imagen de fastly.picsum.photos"
                src={CarrouselImgs[i]}
                className="carousel-img"
                style={{ borderRadius: '10px 10px 0 0', objectFit: 'cover' }}
              />
              <hgroup className="carrousel-header">
                <h1>{CarrouselHeaders[i]}</h1>
                <p>{CarrouselTexts[i]}</p>
              </hgroup>
            </Paper>
          ))}
      </Carousel>
    </Grid>
  )
}

export default Home
