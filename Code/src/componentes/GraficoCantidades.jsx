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
          text: 'Eventos / Categoría',
      },
  },
};


const GraficoCantidades = () => {
  const categorias = useSelector(state => state.categorias.categorias);
  const eventos = useSelector(state => state.eventos.eventos);
    

      if (!eventos.length || !categorias.length) {
        return <p>Cargando datos...</p>;
      }
      
      const eventosPorCategoria = {};
      eventos.forEach(e => {
        let categoria = categorias.find(c => c.id == e.idCategoria);
        
        if(categoria){       
          let nombreCategoria = categoria.tipo;
          if (eventosPorCategoria[nombreCategoria]) {
            eventosPorCategoria[nombreCategoria]++;
            
          } else {
            eventosPorCategoria[nombreCategoria] = 1;
          }
        }
      });
        
      const categoriasConEventos = categorias.filter(c => eventosPorCategoria[c.tipo]);
      const dataFiltrada = categoriasConEventos.map(c => eventosPorCategoria[c.tipo]);
      const labelMapeada = categoriasConEventos.map(c => c.tipo);

  return (
    <div className='row'>
    <div className='white cantidades'> 
    <section className="justify-content-center">
    <h2 className="text-center mb-3">
      Grafico de <span>Cantidades</span>
    </h2>
    <Bar options={options} data={{
                labels: labelMapeada,
                datasets: [
                    {
                        label: 'Cantidad',
                        data: dataFiltrada,
                        backgroundColor: 'rgba(191, 115, 73, 0.5)',
                        
                    }
                ],
            }} />
            
    </section>
    </div>
    </div>
  )
}

export default GraficoCantidades