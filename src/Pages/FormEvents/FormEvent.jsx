import React, { useState } from 'react';
import { Card, CardActions, CardContent, Grid, TextField, Button, Box } from '@mui/material';
import { postCreateEvents } from '../../Services/eventService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import 'dayjs/locale/es';


const FormEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        description: '',
        addressTitle: '',
        dateStart: '',
        dateEnd: ''
    })

    const [dateStart, setStartDate] = useState(null)
    const [dateEnd, setEndDate] = useState(null)

    const handleChange = (event) => {
        const updatedFormData = { ...formData }
        updatedFormData[event.target.name] = event.target.value
        setFormData(updatedFormData)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date)

        setFormData(prevState => ({
            ...prevState,
            dateStart: date
        }))
    }

    const handleEndDataChange = (date) => {
        setEndDate(date)

        setFormData(prevState => ({
            ...prevState,
            dateEnd: date
        }))
    }

    const handleSubmit = async (event) => {
        console.log(formData)
        event.preventDefault()
        try {
            /* await postCreateEvents(formData) */
        } catch (error) {
            console.error('Error al crear evento:', error)
        }
    }

    return (

        <Grid item xs={12} sm={10} md={8} lg={6}>
            <Box component="form" onSubmit={handleSubmit}>

                <h1> Propuesta de Evento</h1>
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
                    }}>
                    <CardContent>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField

                            fullWidth
                            label="Descripción"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            inputProps={{ maxLength: 155 }}
                        />
                        <TextField

                            fullWidth
                            label="Dirección"
                            name="addressTitle"
                            value={formData.addressTitle}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', gap: 2.5, pt: 1.8 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DatePicker
                                    label="Fecha de Inicio"
                                    value={dateStart}
                                    onChange={handleStartDateChange}

                                // defaultValue={dayjs('2022-04-17')}
                                />
                                <DatePicker
                                    label="Fecha de Fin"
                                    value={dateEnd}

                                    onChange={handleEndDataChange}
                                // defaultValue={dayjs('2022-04-17')}
                                />
                            </LocalizationProvider>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained" color="success" >
                            Enviar
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}

export default FormEvent
