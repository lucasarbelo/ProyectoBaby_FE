import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Evento from './Evento'

const ListadoDiario = () => {
  const eventos = useSelector(state => state.eventos.eventos)
  const [eventosActuales, setEventosActuales] = useState([])
  const diaActual = new Date().setHours(0,0,0,0);

  useEffect(() => {
    setEventosActuales(eventos.filter(evt => {
      const fechaEvento = new Date(evt.fecha).setHours(0, 0, 0, 0); // Normaliza la fecha del evento
      return fechaEvento === diaActual;
    }));
  }, [eventos])



  return (
    <div className='col-6'>
      <h3>Listado Diario</h3>
      <ul className="list-group">
        {eventosActuales.map(evento => <Evento key={evento.id} {...evento} />)}
      </ul>

    </div>
  )
}

export default ListadoDiario