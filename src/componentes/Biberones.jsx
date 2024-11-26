import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Biberones = () => {
  const eventos = useSelector(state =>  state.eventos.eventos);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);
  const [tiempoUltimoBiberon, setTiempoUltimoBiberon] = useState(null);
  
  const fechaActual = new Date();
  const inicioDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()); // Inicio del día
  
  const biberonardos = eventos.filter(evt => evt.idCategoria == 35);
  
  // Filtra los biberones del día actual
  const biberonesHoy = biberonardos.filter(bib => {
    const diaBiberon = new Date(bib.fecha);
    return diaBiberon >= inicioDia;
  });
  

  useEffect(() => {
    if (biberonesHoy.length > 0) {
      const ultimoBiberonFecha = new Date(biberonesHoy[biberonesHoy.length - 1].fecha);
      setTiempoUltimoBiberon(ultimoBiberonFecha);

      const actualizarTranscurrido = () => {
        const tiempoActual = new Date();
        const diferenciaTiempo = tiempoActual - ultimoBiberonFecha ;
        setTiempoTranscurrido(diferenciaTiempo);
      };

      actualizarTranscurrido();
      const intervalId = setInterval(actualizarTranscurrido, 1000);
      return () => clearInterval(intervalId);

    } else {
      setTiempoUltimoBiberon(null);
      setTiempoTranscurrido(null);
    }
  }, [biberonesHoy.length]);
  
let horasTranscurridas = 0;
let minutosTranscurridos = 0;
let segundosTranscurridos = 0;

  if(tiempoTranscurrido != null){

    horasTranscurridas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
    minutosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));
    segundosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60)) / 1000);
 
  }
  
  return (
    <div className='col coso'>
      <h3>Biberones</h3>
        <div className="card" style={{ width: "100%", height: "90%" }}>
          <img src='../materiales/img/mamadera.jpg' className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">
              Total de biberones ingeridos hoy: {biberonesHoy.length}
            </p>
            {tiempoUltimoBiberon ? (
              <p className="card-text">
              <small>Tiempo desde el último biberón: {horasTranscurridas} horas y {minutosTranscurridos} minutos, {segundosTranscurridos} segundos</small>
              </p>) : (
                <p>No se ha registrado ningún biberón hoy</p>
              )}
          </div>
        </div>
    </div>
  )
}

export default Biberones


//, {segundosTranscurridos} segundos