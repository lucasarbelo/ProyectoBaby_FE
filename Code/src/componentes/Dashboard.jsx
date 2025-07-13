import { useEffect, useState } from "react";
import Agregar from "./Agregar";
import Analisis from "./Analisis";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos, setUltimo } from "../features/eventosSlice";
import { guardarCategorias } from "../features/categoriasSlice";
import resetBiberones, { setUltimosBiberones } from "../features/biberonSlice";
import ListadoAnterior from "./ListadoAnterior";
import GraficoCantidades from "./GraficoCantidades";
import GraficoComidas from "./GraficoComidas";
import Biberones from "./Biberones";
import Panales from "./Panales";
import ListadoDiario from "./ListadoDiario";



const Dashboard = () => {
  const eventos = useSelector(state => state.eventos.eventos);
  const biberon = useSelector(state => state.biberon.biberones);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {

    if(localStorage.getItem("user") === null){
      navigate('/');
    } else {
      let id = localStorage.getItem("id");
    

    fetch(`https://babytracker.develotion.com/categorias.php`,
      {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'apikey': localStorage.getItem('apikey'),
            'iduser': localStorage.getItem('id'),
        
        },
    })
        .then((response) => response.json())
        .then((json) => {
              //setTimeout(2000);
              dispatch(guardarCategorias(json.categorias));
              //ESTA VA ACA YA QUE SE HACE UNA VEZ ABIERTO EL DASHBOARD
              //aca me llega la lista de eventos, con esta lista deberiamos de filtrar las de hoy, y cargar en un array, y las que no son de hoy, guardarlas en el otro
              //se carga en el store
              fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${id}`,
                {
                  method: 'GET',
                  headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                      'apikey': localStorage.getItem('apikey'),
                      'iduser': id, 
                  },
              })
                  .then((response) => response.json())
                  .then((json) => {
                        dispatch(guardarEventos(json.eventos));
                        //console.log('evts', eventos);
                        
                        dispatch(setUltimosBiberones(eventos.filter(evt => evt.idCategoria == 35)));
                        //console.log('bibers', biberon);

                        //STAND BY
                        /*const tiempoActual = json.fecha.toISOString(); 
                        dispatch(setUltimo(tiempoActual))*/
                }
              )
      }
    )

  }
  
  }, []);


  const logout = () => {
    localStorage.clear();
    navigate('/');
  };


  return (
    <>
   <div className="container mt-4">
  <div className="row align-items-center mb-4">
    <div className="col d-flex justify-content-between align-items-center text-center">
      <h2 className="mb-0 text-center">Dashboard de {localStorage.getItem('user')}</h2>
      <button className="btn btn-danger" type="button" onClick={logout}>Logout</button>
    </div>
  </div>
  

      <div className="row">
        <div className="col-4">
          <div className="agregar-card">
            <Agregar />
          </div>
        </div>
        <div className="col-4">
          <div className="listados-card">
            <ListadoAnterior />
          </div>
        </div>
        <div className="col-4">
          <div className="listados-card">
            <ListadoDiario />
          </div>
        </div>
      </div>

      <div className="row">
              <div className="col-12">
                <div className="dashboard-card">
                  <Analisis />
                </div>
              </div>
      </div>
      <div className="row">
      <div className="col-4">
                <div className="dashboard-card">
                    <GraficoCantidades />
                </div>
              </div>

              <div className="col-4">
                <div className="dashboard-card">
                    <GraficoComidas />
                </div>
              </div>

               <div className="col-2">
             <div className="biberonypanial-card">
                    <Biberones />
                </div>
              </div>

              <div className="col-2">
                <div className="biberonypanial-card">
                    <Panales />
                </div>
              </div>
      </div>
    </div>
    </>
    
  )
}

export default Dashboard
