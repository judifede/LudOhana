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
  IconButton,
  Box,
  Modal,
  Button,
} from '@mui/material'
import {
  getMaterialsEvents,
  deleteMaterialsToEvent,
} from '../../Services/materials'
import { Delete, Edit } from '@mui/icons-material'

function Materials() {
  const [materialsEvents, setMaterialsEvents] = useState([])
  const [materials, setMaterials] = useState([])
  const [events, setEvents] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  //const [isOpenModalEdit, setIsOpenModal] = useState(false)

  const [materialId, setMaterialId] = useState([])
  const [eventId, setEventId] = useState([])

  console.log(materialsEvents)

  const handleDeleteMaterial = async () => {
    const res = await deleteMaterialsToEvent(materialId, eventId)
    if (res.message) {
      const newMaterialsEvents = materialsEvents.filter((elem) => {
        return elem.materialId !== materialId && elem.eventId !== eventId
      })
      setMaterialsEvents(newMaterialsEvents)

      console.log(materialsEvents)
    }
  }

  const columns = [
    { id: 'id', label: 'ID | Nombre del Material ' },
    { id: 'amount', label: 'Cantidad' },
    { id: 'amountUsed', label: 'En Uso' },
    { id: 'eventId', label: 'ID | Nombre del evento ' },
    { id: 'actions', label: 'Acciones' },
  ]

  const handleMaterialEvents = async () => {
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
    handleMaterialEvents()
  }, [])
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Gestor de Materiales
        </Typography>
        <Box
          padding="4%"
          border="1px solid grey"
          borderRadius="10px"
          marginTop="2%"
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {materialsEvents.map((row) => {
                  const material = materials.find(
                    (m) => m.id === row.materialId
                  )
                  const event = events.find((e) => e.id === row.eventId)

                  return (
                    <TableRow key={row.materialId}>
                      <TableCell align="left">
                        {material
                          ? material.id + ' | ' + material.name
                          : 'No disponible'}
                      </TableCell>
                      <TableCell align="left">
                        {material ? material.amount : 'No disponible'}
                      </TableCell>
                      <TableCell align="left">{row.amountUsed}</TableCell>
                      <TableCell align="left">
                        {event
                          ? event.id + ' | ' + event.title
                          : 'No disponible'}
                      </TableCell>

                      <TableCell
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton color="warning"
                         onClick={() => {
                          setIsOpenModal((prev) => !prev)
                          
                        }}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setIsOpenModal((prev) => !prev)
                            setEventId(event.id)
                            setMaterialId(material.id)
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      <Modal
        open={isOpenModal === true}
        onClose={()=>{setIsOpenModal(false)}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            ¿Está seguro de que desea borrar el material?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
          <Box display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => {
                handleDeleteMaterial()

                setIsOpenModal((prev) => !prev)
              }}
            >
              Si
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => {
                setIsOpenModal((prev) => !prev)
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isOpenModal === true}
        onClose={()=>{setIsOpenModal(false)}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Editar Material
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
          <Box display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => {
                handleDeleteMaterial()

                setIsOpenModal((prev) => !prev)
              }}
            >
              Si
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => {
                setIsOpenModal((prev) => !prev)
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  )
}

export default Materials
