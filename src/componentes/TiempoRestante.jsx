import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const TiempoRestante = () => {
  const eventos = useSelector(state =>  state.eventos.eventos);
  //const ultimoBiberon = useSelector(state => state.biberon.ultimoBiberon);
  const ultimoBiberon = useSelector(state => state.biberon.ultimoBiberon);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [estaPasado, setEstaPasado] = useState(false);

  const biberonardos = eventos.filter(evt => evt.idCategoria == 35);

  useEffect(() => {
    if (!ultimoBiberon) return;

    const calularTiempoRestante = () => {
      const ultimoTiempo = new Date(ultimoBiberon);
      const proximoBiberon = new Date(ultimoTiempo.getTime() + 4 * 60 * 60 * 1000); 
      const actual = new Date();
      const diferenciaTiempo = proximoBiberon - actual;

      setEstaPasado(diferenciaTiempo < 0);
      setTiempoRestante(Math.max(diferenciaTiempo, 0)); // Evita valores negativos
    };

     // Calcula el tiempo restante inmediatamente
     calularTiempoRestante();

     // Actualiza el tiempo restante cada segundo
     const intervalId = setInterval(calularTiempoRestante, 1000);
 
     // Limpia el intervalo al desmontar el componente
     return () => clearInterval(intervalId);
   }, [ultimoBiberon]);


  if (!ultimoBiberon) {
    return <div>No se ha registrado ningún biberón aún.</div>;
  }

  const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  const colorTexto = estaPasado ? 'red' : 'green';


  return (
      <div className='card zonaBiberon' style={{width: "100%",height: "90%" , color: colorTexto }}>
        <div className="card-body">
          <h3 className="card-text">
            <strong>
          {estaPasado
              ? '¡El bebé debería haber tomado su biberón!'
              : `Próximo biberón en ${horas} horas, ${minutos} minutos y ${segundos} segundos`}
              </strong>
          </h3>
    
  </div>
  </div>
  )
}

export default TiempoRestante