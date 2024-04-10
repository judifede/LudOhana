import './Home.css'
import Carousel from 'react-material-ui-carousel'
import { Paper, Grid } from '@mui/material'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'

import imageUrl1 from '../../assets/FiestadeBurbujas.webp'
import imageUrl2 from '../../assets/ninoDisfutandoMar.webp'
import imageUrl3 from '../../assets/ninaConPerro.webp'

function Home() {
  const CarrouselImgs = [imageUrl1, imageUrl2, imageUrl3]
  const CarrouselHeaders = ["Fiesta de burbujas", "imageUrl2", "imageUrl3"]
  const CarrouselTexts = ["Divertirse nunca fue tan fácil", "imageUrl2", "imageUrl3"]
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
              />
              <hgroup className="carrousel-header">
                <h2>{CarrouselHeaders[i]}</h2>
                <p>{CarrouselTexts[i]}</p>
              </hgroup>
            </Paper>
          ))}
      </Carousel>
    </Grid>
  )
}

export default Home
