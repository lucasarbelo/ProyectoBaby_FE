import React from 'react'
import GraficoCantidades from './GraficoCantidades'
import GraficoComidas from './GraficoComidas'
import TiempoRestante from './TiempoRestante'



const Analisis = () => {
  return (
    <>
    <h2 className='text-center'>Analisis</h2>
    <div className='row'>
      <TiempoRestante />
    </div>
  
    </>

  )
}

export default Analisis


/*  <div className='row'>
      <GraficoCantidades />
      <GraficoComidas />
    </div> */