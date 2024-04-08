
import { Typography, Grid,TableRow,TableCell,Button } from '@mui/material'
import { getMaterialsEvents } from '../../Services/materials';
import { useState } from 'react'

const columns = [
  {
    width: 200,
    label: 'Dessert',
    dataKey: 'dessert',
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    numeric: true,
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    numeric: true,
  },
];

function Materials() {
  const[materialsEvents,setMaterialsEvents]=useState([])
  const handleMaterialsEvents = async ()=>{

    await setMaterialsEvents(getMaterialsEvents())
  }

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

      <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>    
    <Button onClick={()=>{handleMaterialsEvents()}}>Prueba </Button>     
    </Grid>
  )
}

export default Materials
