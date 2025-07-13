import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
      legend: {
          position: 'top',
      },
      title: {
          display: true,
          text: 'Comidas / Dia',
      },
  },
};



const GraficoComidas = () => {
  const [dias, setDias] = useState([]);
  const categorias = useSelector(state => state.categorias.categorias);
  const eventos = useSelector(state => state.eventos.eventos);

  const comidasPorDia = dias.reduce((acc, dia) => {
    acc[dia] = 0;
    return acc;
  }, {});
  
  useEffect(() => {
    if(eventos.length == 0 || eventos == undefined || eventos== ""){
      console.log('el array llego vacio');
    } else {
      console.log('se cargaron los eventos');
    
      const hoy = new Date();
      const ultimos7Dias = [];
    
      for (let i = 6; i >= 0; i--) {
        const dia = new Date(hoy);
        dia.setDate(hoy.getDate() - i);
        dia.setHours(0, 0, 0, 0);        
        const diaFormateado = dia.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        ultimos7Dias.push(diaFormateado);
      }
      setDias(ultimos7Dias);
    }
  }, [eventos])

 

  if(eventos.length != 0){
     eventos.forEach(evento => {
      //const categoria = categorias.find(c => c.id === evento.idCategoria);
      if (evento.idCategoria == 31 ) {
        const eventoSpliteado = evento.fecha.split(' ')[0];
        let diaFormateado = '';
        if(eventoSpliteado == moment().format('YYYY-MM-DD')){
        
          const fechaEventoSpliteado = new Date(`${eventoSpliteado}T00:00:00`);
          diaFormateado = fechaEventoSpliteado.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
          
        } else {
          const fecha = new Date(`${evento.fecha}T00:00:00`); 
          fecha.setHours(0, 0, 0, 0);      
          diaFormateado = fecha.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        //Problema con las fechas solucionado, en caso de que tome la fecha de hoy, se formatea como arriba, si es vieja, se formatea como abajo, evita discrepancias en las fechas

        }

        
        if (comidasPorDia[diaFormateado] !== undefined) {
          comidasPorDia[diaFormateado]++;
        }
      }
    })

    ;
  }
  
  const cantidadComidas = dias.map(dia => comidasPorDia[dia] || 0);

  return (
    <>
    <div className='row'>
    <div className='white cantidades'> 
    <section className="justify-content-center">
    <h2 className="text-center mb-3">
      Grafico de <span>Comidas</span>
    </h2>
    <Bar className="m-2" options={options} data={{
                labels: dias,
                datasets: [
                    {
                        label: 'Cantidad de comidas',
                        data: cantidadComidas,
                        // en data SE PONE EL ARRAY que CARGO
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }} />
            
    </section>
    </div>
    </div>
    </>
  )
}

export default GraficoComidas