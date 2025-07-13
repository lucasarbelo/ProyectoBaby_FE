import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Contenedor = () => {
  return (
    <div className='container'>
        <header className='row mt-20'>
            <h1 className='text-center titulo-bebe'>Seguimiento de bebé</h1>
          
        </header>
             <main className='row'>
                <Outlet />
            </main>
        </div>
  )
}

export default Contenedor


/*  <nav className='text-center'>
                <NavLink to="/">Inicio</NavLink> - <NavLink to="/dashboard">Dashboard</NavLink> - <NavLink to="/registrar">Registrar</NavLink>

            </nav>*/