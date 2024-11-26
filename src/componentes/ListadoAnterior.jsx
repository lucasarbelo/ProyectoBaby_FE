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
  
/*

Se listarán todos los eventos registrados por el
usuario. A cada categoría del evento corresponde un ícono que se
puede encontrar en la URL de base de imágenes disponible en la
documentación, a eso se debe concatenar el nombre de la imagen
obtenida del servicio de categorías y la extensión .png. 
Al costado de cada evento se deberá disponer un botón para eliminar los datos
de ese evento.

Listado de días anteriores: Se listarán todos los eventos
correspondientes a días anteriores.


supongo que acá se usa redux, para actualizarse automaticamente la lista, debo estar escuchando el array de eventos (pasados)
debo tener 2 arrays, me traigo una vez los eventos y cargo los 2 array

// DEJE EL FETCH EN DASHBOARD, SEGUN EL PROFE SE CARGA TODO LO Q ES REDUX AHI

*/

  return (
    <div className='col-6'>
      <h3>Listado Anterior</h3>
      <ul className="list-group">
        {eventosViejos.map(evento => <Evento key={evento.id} {...evento} />)}
      </ul>
    </div>
  )
}

export default ListadoAnterior