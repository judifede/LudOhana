import { AppBar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <AppBar position='static' color='backgroudHeader'>
            <header>
                <Link to={'/'}>
                    Inicio
                </Link>
                <Link to={'/events'}>
                    Eventos
                </Link>
                <Link to={'/settings'}>
                    Ajustes
                </Link>
                <Link to={'/login'} >
                    Iniciar Sesión
                </Link>
            </header>
        </AppBar>
    )
}

export default Header
