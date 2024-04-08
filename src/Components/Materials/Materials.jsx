/* 
import { Typography, Grid,TableRow,TableCell,Button, TableBody, TableContainer, Table, TableHead } from '@mui/material'
import { getMaterialsEvents } from '../../Services/materials';
import { useState } from 'react'


function Materials() {
  const[materialsEvents,setMaterialsEvents]=useState([])
  const [materials,setMaterials]=useState([])
  const [events,setEvents]=useState([])
  const handleMaterialsEvents = async () => {
    const data = await getMaterialsEvents();
    setMaterialsEvents(data.allMaterialEvent);
  }
  const handleMaterials = async()=>{
    const data = await getMaterialsEvents()
    setMaterials(data.allMaterial)
  }
  const handleEvents = async()=>{
    const data = await getMaterialsEvents()
    setEvents(data.allEvent)
  }
  const columns = [
    { id: 'id', label: 'ID del Material' },
    { id: 'name', label: 'Nombre del Material' },
    { id: 'amount', label: 'Cantidad' },
    { id: 'amountUsed', label: 'En Uso' },
    { id: 'eventId', label: 'ID del Evento' },
    { id: 'eventTitle', label: 'Nombre del Evento' },
    { id: 'actions', label: 'Acciones' }, 
  ];

  return (
    
    <Grid
      item
      sx={{ marginTop: '20px' }}
      xs={12}
      // sm={6} md={3} lg={3} xl={2.4}
    >
      <Typography
        id="modal-title"
        variant="h3"
        component="h2"
        textAlign="center"
      >
        Gestor de Materiales 
      </Typography>

      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {materialsEvents.map((row) => {
                const material = materials.find((m) => m.id === row.materialId); // Encontrar el material correspondiente
                const event = events.find((e)=>e.id === row.eventId)
                return (
                  <TableRow key={row.materialId}>
                    <TableCell align="center">{material.id}</TableCell>
                    <TableCell align="center">{material.name}</TableCell>
                    <TableCell align="center">{material.amount}</TableCell>
                    <TableCell align="center">{row.amountUsed}</TableCell>
                    <TableCell align="center">{event.id}</TableCell>
                    <TableCell align="center">{event.title}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" style={{ marginRight: '8px' }}>
                        Editar
                      </Button>
                      <Button variant="outlined" color="secondary">
                        Borrar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
    <Button onClick={()=>{handleMaterialsEvents(); handleMaterials() ;handleEvents()}}>Prueba </Button>     
    </Grid>
  )
}

export default Materials
 */

import { useState, useEffect } from 'react'
import {
  Typography,
  Grid,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  InputAdornment,
  Icon,
} from '@mui/material'
import { getMaterialsEvents } from '../../Services/materials'
import { Delete, Edit } from '@mui/icons-material'

function Materials() {
  const [materialsEvents, setMaterialsEvents] = useState([])
  const [materials, setMaterials] = useState([])
  const [events, setEvents] = useState([])

  const columns = [
    { id: 'id', label: 'ID del Material' },
    { id: 'name', label: 'Nombre del Material' },
    { id: 'amount', label: 'Cantidad' },
    { id: 'amountUsed', label: 'En Uso' },
    { id: 'eventId', label: 'ID del Evento' },
    { id: 'eventTitle', label: 'Nombre del Evento' },
    { id: 'actions', label: 'Acciones' },
  ]

  const fetchData = async () => {
    try {
      const [materialsData, materialsEventsData, eventsData] =
        await Promise.all([
          getMaterialsEvents(),
          getMaterialsEvents(),
          getMaterialsEvents(),
        ])
      setMaterials(materialsData.allMaterial)
      setMaterialsEvents(materialsEventsData.allMaterialEvent)
      setEvents(eventsData.allEvent)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Gestor de Materiales
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {materialsEvents.map((row) => {
                const material = materials.find((m) => m.id === row.materialId)
                const event = events.find((e) => e.id === row.eventId)

                return (
                  <TableRow key={row.materialId}>
                    <TableCell align="center">
                      {material ? material.id : 'No disponible'}
                    </TableCell>
                    <TableCell align="center">
                      {material ? material.name : 'No disponible'}
                    </TableCell>
                    <TableCell align="center">
                      {material ? material.amount : 'No disponible'}
                    </TableCell>
                    <TableCell align="center">{row.amountUsed}</TableCell>
                    <TableCell align="center">
                      {event ? event.id : 'No disponible'}
                    </TableCell>
                    <TableCell align="center">
                      {event ? event.title : 'No disponible'}
                    </TableCell>
                    <TableCell 
                    sx={{
                      display:"flex",
                      flexDirection:"row", 
                      justifyContent:"space-between",
                      alignItems:"center",
                  
                      }}>
                       <InputAdornment >
                         <Icon>
                           <Edit />
                         </Icon>
                         <Icon>
                           
                           <Delete/>
                         </Icon>
                       </InputAdornment>
                       {/* <InputAdornment>
                         <Icon>
                           <Delete/>
                         </Icon>
                       </InputAdornment> */}
                     
                    
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Materials
