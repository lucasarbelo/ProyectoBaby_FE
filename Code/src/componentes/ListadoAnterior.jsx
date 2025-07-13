import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Evento from './Evento';

const ListadoAnterior = () => {
  const eventos = useSelector(state => state.eventos.eventos)
  const [eventosViejos, setEventosViejos] = useState([])
  const diaActual = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    setEventosViejos(eventos.filter(evt => {
      const fechaEvento = new Date(evt.fecha).setHours(0, 0, 0, 0); 
      
      return fechaEvento < diaActual;
    }));
  }, [eventos])
  

  return (
    <div className='col'>
      <h3>Listado Anterior</h3>
      <ul className="list-group">
        {eventosViejos.map(evento => <Evento key={evento.id} {...evento} />)}
      </ul>
    </div>
  )
}

export default ListadoAnterior