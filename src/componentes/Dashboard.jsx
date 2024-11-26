import { useEffect, useState } from "react";
import Agregar from "./Agregar";
import Listado from "./Listado";
import Analisis from "./Analisis";
import InformeEventos from "./InformeEventos";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos, setUltimo } from "../features/eventosSlice";
import { guardarCategorias } from "../features/categoriasSlice";
import resetBiberones, { setUltimosBiberones } from "../features/biberonSlice";



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
    <div className="container text-center">
    <div className="row">
      <h2><div className='text-bg-dark text-center'>Dashboard de {localStorage.getItem('user')}</div></h2>
      
      <button type="button" onClick={logout}>Logout</button>

    </div>

    <div className="row">

    
      <div className="col-4 insertar">
        <Agregar />

      </div>
      <div className="col-8 listado">
        <Listado />

      </div>

      
      </div>
      <div className="row">
      <div className="col-8">
        <Analisis />

      </div>
      <div className="col-4">
        <InformeEventos />
        
      </div>
      </div>
      </div>
    </>
    
  )
}

export default Dashboard



/*import { useEffect, useState } from "react";
import Agregar from "./Agregar";
import Listado from "./Listado";
import Analisis from "./Analisis";
import InformeEventos from "./InformeEventos";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { guardarEventos } from "../features/eventosSlice";
import { guardarCategorias } from "../features/categoriasSlice";



const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {

    if(localStorage.getItem("user") === null){
      navigate('/');
    } else {
      let id = localStorage.getItem("id");
    }

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
             // setTimeout(2000);
              dispatch(guardarCategorias(json.categorias));
              //ESTA VA ACA YA QUE SE HACE UNA VEZ ABIERTO EL DASHBOARD
              //aca me llega la lista de eventos, con esta lista deberiamos de filtrar las de hoy, y cargar en un array, y las que no son de hoy, guardarlas en el otro
              //se carga en el store
      }
    )

    //setTimeout(2000);

    fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem('id')}`,
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
              dispatch(guardarEventos(json.eventos));
              //ESTA VA ACA YA QUE SE HACE UNA VEZ ABIERTO EL DASHBOARD
              //aca me llega la lista de eventos, con esta lista deberiamos de filtrar las de hoy, y cargar en un array, y las que no son de hoy, guardarlas en el otro
              //se carga en el store
      }
    )
  
  }, []);


  const logout = () => {
    localStorage.clear();
    navigate('/');
    // aca tambien tengo q setear los slice a vacios
    // biberon, eventos, pañales
  };


  return (
    <>
    <div className="container text-center">
    <div className="row">
      <h2><div className='text-bg-dark text-center'>Dashboard de {localStorage.getItem('user')}</div></h2>
      
      <button type="button" onClick={logout}>Logout</button>

    </div>

    <div className="row">

    
      <div className="col-4 insertar">
        <Agregar />

      </div>
      <div className="col-8 listado">
        <Listado />

      </div>

      
      </div>
      <div className="row">
      <div className="col-8">
        <Analisis />

      </div>
      <div className="col-4">
        <InformeEventos />
        
      </div>
      </div>
      </div>
    </>
    
  )
}

export default Dashboard*/