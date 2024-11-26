import { useRef, useState } from "react"
import { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";

const Registro = () => {

   let navigate = useNavigate();
    if (localStorage.getItem("user") != null) {
        navigate('/dashboard');
    }

    const nombre = useRef(null);
    const contra = useRef(null);
    const ciudad = useRef(null);
    const departamento = useRef(null);
    const [depas, setDepas] = useState([]);
    const [laciudad, setCiudad] = useState([]);

    useEffect(() => {
        fetch("https://babytracker.develotion.com/departamentos.php")
            .then(r => r.json())
            .then(datos => {
              setDepas(datos.departamentos);            
                
            })

    }, []);

    const Ciudades = (evento) => {
        const departamentoId = evento.target.value;

        if (departamentoId != "") {
            fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${departamentoId}`)
                .then(r => r.json())
                .then(datos => {
                    setCiudad(datos.ciudades);
                })
                .catch(error => {
                    console.error("Error al obtener las ciudades:", error);
                });
        } else {
            setCiudad([]);
        }
    };


    const guardarUsuario = () => {
        let nombreusuario = nombre.current.value;
        let contrausuario = contra.current.value;
        let depausuario = departamento.current.value;
        let ciudadusuario = ciudad.current.value;
        if (depausuario != "" && ciudadusuario != ""){
            console.log(ciudadusuario, depausuario);

        let usuarionuevo = {
            usuario: nombreusuario,
            password: contrausuario,
            idDepartamento: depausuario,
            idCiudad: ciudadusuario
        }
        
            fetch('https://babytracker.develotion.com/usuarios.php', {
                method: 'POST',
                body: JSON.stringify(usuarionuevo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    usuarionuevo.id = json.id;
                    if (json.codigo == 200) {

                        let usuarioArmado = {
                            usuario: nombreusuario,
                            password: contrausuario
                        }
                
                        fetch('https://babytracker.develotion.com/login.php',{
                            method: 'POST',
                            body: JSON.stringify(usuarioArmado),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            if (json.codigo == 200) {
                                localStorage.setItem("user", nombreusuario);
                                localStorage.setItem("id", json.id);
                                localStorage.setItem("apikey", json.apiKey);                
                                navigate('/dashboard');
                            }
                        }
                        )}
                    
                    else {
                     toast.error(json.mensaje, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });

                        }
                    }
                
                )
                    

    } else {
        toast.error("No se pudo registrar, verifique su departamento o ciudad", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
}
    return (
        <div className="text-center registro">
            <h2>Register</h2>
            <label htmlFor="txtUsuario">Nombre de usuario:</label>
            <input type="text" name="txtUsuario" id="txtUsuario" ref={nombre} />
            <br />
            <label htmlFor="txtContra">Contraseña:</label>
            
            <input type="password" name="txtContra" id="txtContra" ref={contra} />
        <br />
            <select className="form-select" ref={departamento} onChange={Ciudades}>
                <option value="">Seleccione su Departamento</option>
                {depas.map(dep => (
                    <option key={dep.id} value={dep.id}>
                        {dep.nombre}
                    </option> ))}

            </select>
<br />
            <select className="form-select" ref={ciudad} disabled={!laciudad}>
                <option value="">Seleccione su Ciudad</option>
                {laciudad.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>))}

            </select>
            
<br />
            <input type="button" defaultValue="Agregar" onClick={guardarUsuario} />
            <br />
            <Link to='/'>Login</Link>

        </div>
    )
}


export default Registro


//                <ListarPaises />
//            <Link to='/'>Login</Link>


/*
function completarSelectDepartamentos(departamentos)
{
console.log("cosas", departamentos);
/*
    let select = dqs("Select-Departamento")

    for(let d of departamentos)
    departamento +=  `<option value="${d.id}">${d.nombre}</option>`
    ObtenerCiudades();
   
}

function completarSelectCiudades(ciudades)
{
    let select = dqs("Select-Ciudades")
    select.innerHTML = ""
    for(let c of ciudades)
    select.innerHTML +=  `<option value="${d.id}">${d.nombre}</option>`
}


function ObtenerCiudades(evt){
    let idDepartamento = evt.detail.value //el id del depto sleccionado
    console.log("departamento seleccionado "+idDepartamento)

    fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
        },
})
        .then(function (response) {
                console.log(response);
                return response.json();
        }).then(function (data) {
                console.log(data);
                completarSelectCiudades(data.ciudades)
        }
        )}
    
*/