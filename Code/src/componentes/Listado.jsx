import React from 'react'
import ListadoAnterior from './ListadoAnterior'
import ListadoDiario from './ListadoDiario'

const Listado = () => {
  return (
    <>
      <div className='row justify-content-center p-2 coso'>
        <h2 className='text-center'>Eventos</h2>
        <ListadoAnterior />
        <ListadoDiario />
      </div>
    </>
  )
}

export default Listado
