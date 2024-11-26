import './estilos.css'
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Dashboard from './componentes/Dashboard'
import Login from './componentes/Login'
import Register from './componentes/Register'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Contenedor from './componentes/Contenedor';
import NoEncontrado from './componentes/NoEncontrado';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Contenedor />}>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />		
            <Route path='*' element={<NoEncontrado />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  )
}

export default App
