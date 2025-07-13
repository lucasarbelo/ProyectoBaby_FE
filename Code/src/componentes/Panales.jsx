import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Panales = () => {
  const eventos = useSelector(state =>  state.eventos.eventos);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);
  const [tiempoUltimoPanal, setTiempoUltimoPanal] = useState(null);

  const fechaActual = new Date();
  const inicioDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()); // Inicio del día

  const panialardos = eventos.filter(evt => evt.idCategoria == 33);

  // Filtra los biberones del día actual
  const panalesHoy = panialardos.filter(pan => {
    const diaPanal = new Date(pan.fecha);
    return diaPanal >= inicioDia;
  });


  useEffect(() => {
    if (panalesHoy.length > 0) {
      const ultimoPanialFecha = new Date(panalesHoy[panalesHoy.length - 1].fecha);
      setTiempoUltimoPanal(ultimoPanialFecha);

      const actualizarTranscurrido = () => {
        const tiempoActual = new Date();
        const diferenciaTiempo = tiempoActual - ultimoPanialFecha;
        setTiempoTranscurrido(diferenciaTiempo);

      };

      // Actualiza el tiempo transcurrido inmediatamente
      actualizarTranscurrido();

      // Actualiza el tiempo transcurrido cada segundo
      const intervalId = setInterval(actualizarTranscurrido, 1000);

      // Limpia el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    } else {
      // Si no hay biberones hoy, resetea los valores
      setTiempoUltimoPanal(null);
      setTiempoTranscurrido(null);
    
    }
  }, [panalesHoy.length]);
  
  let horasTranscurridas = 0;
  let minutosTranscurridos = 0;
  let segundosTranscurridos = 0;

  if(tiempoTranscurrido != null){

    horasTranscurridas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
    minutosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));
    segundosTranscurridos = Math.floor((tiempoTranscurrido % (1000 * 60)) / 1000);
 
  }

 return (
  <div className="col fijo"> {/* mb-4 para margen inferior */}
    <h3>Pañales</h3>
    <div
      className="card"
      style={{
        width: "100%",
        height: "90%",
      }}
    >
      <img
        src="../materiales/img/panal.jpg"
        className="card-img-top"
        alt="Imagen de pañal"
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", objectFit: "scale-down", height: "120px" }} 
      />
      <div className="card-body">
        <p className="card-text">
          Total de pañales cambiados en el día: {panalesHoy.length}
        </p>
        <div className="card-text">
          {tiempoUltimoPanal ? (
            <p className="card-text">
              <small>
                Tiempo desde el último cambio: {horasTranscurridas} horas y {minutosTranscurridos} minutos, {segundosTranscurridos} segundos
              </small>
            </p>
          ) : (
            <p>No se ha registrado ningún cambio de pañal hoy</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

}

export default Panales