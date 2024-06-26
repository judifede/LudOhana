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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import {
  getMaterialsEvents,
  deleteMaterialsToEvent,
  updateMaterials,
  addMaterialEvent,
  createMaterials,
  createMaterialEvent,
} from '../../Services/materials'
import { Delete, Edit } from '@mui/icons-material'

function Materials() {
  const [materialsEvents, setMaterialsEvents] = useState([])
  const [materials, setMaterials] = useState([])
  const [events, setEvents] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
  const [isOpenModalAddRelation, setIsOpenModalAddRelation] = useState(false)
  const [materialId, setMaterialId] = useState([])
  const [eventId, setEventId] = useState('')
  const [nameMaterial, setNameMaterial] = useState([])
  const [amountMaterial, setAmountMaterial] = useState([])
  const [amountUsedMaterials, setAmountUsedMaterials] = useState([])
  const [inputsValue, setInputsValues] = useState({})
  const [eventInput, setEventInput] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleCreateMaterialEvent = async () => {
    const res = await createMaterialEvent({
      amountUsed: amountUsedMaterials,
      materialId,
      eventId: eventInput.id,
    })
    if (res.message) {
      setIsOpenModalAddRelation((prev) => !prev)
      setIsOpenModalCreate((prev) => !prev)
      setRefresh((prev) => !prev)
    }
  }

  const handleCreateMaterial = async () => {
    const res = await createMaterials({
      name: nameMaterial,
      amount: amountMaterial,
    })

    if (res.message) {
      setMaterialId(res.material.id)
      setIsOpenModalCreate((prev) => !prev)
      setIsOpenModalAddRelation((prev) => !prev)
    }
  }

  const handleEventInput = (e) => {
    setEventInput(e.target.value)
  }

  const handleUpdateMaterials = async () => {
    let eventInputId = 0
    events.forEach((event) => {
      if (event.title === eventInput.titleEvent) {
        eventInputId = event.id
      }
      console.log(eventInputId)
    })

    const data = await updateMaterials(materialId, {
      name: nameMaterial,
      amount: amountMaterial,
    })
    if (data.message) {
      await addMaterialEvent(eventId, materialId, {
        eventId: eventInput.id,
        amountUsed: amountUsedMaterials,
      })
      setRefresh((prev) => !prev)
    }
  }

  const handleDeleteMaterial = async () => {
    const res = await deleteMaterialsToEvent(materialId, eventId)
    if (res.message) {
      const newMaterialsEvents = materialsEvents.filter((elem) => {
        return elem.materialId !== materialId && elem.eventId !== eventId
      })
      setMaterialsEvents(newMaterialsEvents)
    }
  }

  const columns = [
    { id: 'id', label: 'ID | Nombre del Material ' },
    { id: 'amount', label: 'Cantidad disponible' },
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
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    handleMaterialEvents()
  }, [refresh])

  return (
    <Grid container justifyContent="center" sx={{ marginTop: '60px', px: 10 }}>
      {isLoading && (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      )}
      <Grid item xs={12}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Gestor de Materiales
        </Typography>

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={() => {
            setIsOpenModalCreate((prev) => !prev)
          }}
        >
          Crear Material
        </Button>
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
                  const amountMaterialUsed = row.amountUsed
                  const material = materials.find(
                    (m) => m.id === row.materialId
                  )
                  const event = events.find(
                    (e) => e.id === row.eventId || row.eventId === null
                  )

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
                      <TableCell align="left">{amountMaterialUsed}</TableCell>
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
                        <IconButton
                          color="warning"
                          onClick={() => {
                            setIsOpenModalEdit((prev) => !prev)
                            setEventId(event.id)
                            setInputsValues({
                              nameMaterial: material.name,
                              amountMaterial: material.amount,
                              amountUsedMaterials: amountMaterialUsed,
                              titleEvent: event.title,
                            })
                            setEventInput(event.title)
                            setMaterialId(material.id)
                          }}
                        >
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
        onClose={() => {
          setIsOpenModal(false)
        }}
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
          <Box display="flex" justifyContent="end" gap="10px">
            <Button
              variant="text"
              color="success"
              sx={{
                mt: 2,
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              }}
              onClick={() => {
                setIsOpenModal((prev) => !prev)
              }}
            >
              No
            </Button>
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
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isOpenModalEdit === true}
        onClose={() => {
          setIsOpenModalEdit(false)
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Editar Material
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
          <Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setNameMaterial(e.target.value)
                }}
                defaultValue={inputsValue.nameMaterial}
                type="text"
                label="Nombre:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
            </Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setAmountMaterial(e.target.value)
                }}
                defaultValue={inputsValue.amountMaterial}
                type="number"
                label="Cantidad:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
              <TextField
                onChange={(e) => {
                  setAmountUsedMaterials(e.target.value)
                }}
                defaultValue={inputsValue.amountUsedMaterials}
                type="number"
                label="En Uso:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
            </Box>
            <Box>
              <FormControl sx={{ width: '100%', marginTop: '2%' }}>
                <InputLabel id="events-label" />

                <Select
                  onChange={(e) => {
                    handleEventInput(e)
                  }}
                  value={eventInput}
                  labelId="events-label"
                  sx={{ width: '100%' }}
                >
                  {events.map((event) => (
                    <MenuItem value={event} key={event.id}>
                      {event.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" gap="10px">
              <Button
                variant="text"
                color="error"
                sx={{
                  mt: 2,
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                }}
                onClick={() => {
                  setIsOpenModalEdit((prev) => !prev)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleUpdateMaterials()
                  setIsOpenModalEdit((prev) => !prev)
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isOpenModalCreate === true}
        onClose={() => {
          setIsOpenModalEdit(false)
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Crear Material
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
          <Box>
            <Box>
              <TextField
                onChange={(e) => {
                  setNameMaterial(e.target.value)
                }}
                type="text"
                label="Nombre:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
              <TextField
                onChange={(e) => {
                  setAmountMaterial(e.target.value)
                }}
                type="number"
                label="Cantidad:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
            </Box>

            <Box display="flex" justifyContent="end" gap="10px">
              <Button
                variant="text"
                color="error"
                sx={{
                  mt: 2,
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                }}
                onClick={() => {
                  setIsOpenModalCreate((prev) => !prev)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleCreateMaterial()
                  setIsOpenModalCreate((prev) => !prev)
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isOpenModalAddRelation === true}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Asociar material a un evento
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}></Typography>
          <Box>
            <Box>
              <TextField
                value={nameMaterial}
                type="text"
                label="Nombre:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>

              <TextField
                onChange={(e) => {
                  setAmountUsedMaterials(e.target.value)
                }}
                type="number"
                label="Cantidad:"
                variant="filled"
                fullWidth={true}
                margin="dense"
              ></TextField>
            </Box>
            <Box>
              <FormControl sx={{ width: '100%', marginTop: '2%' }}>
                <InputLabel id="events-label" />

                <Select
                  onChange={(e) => {
                    handleEventInput(e)
                  }}
                  value={eventInput}
                  labelId="events-label"
                  sx={{ width: '100%' }}
                >
                  {events.map((event, idx) => (
                    <MenuItem value={event} key={idx}>
                      {event.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end" gap="10px">
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleCreateMaterialEvent()
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Grid>
  )
}

export default Materials
