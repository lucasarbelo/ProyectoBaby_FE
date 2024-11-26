import { useEffect, useId } from 'react';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';

const Login = () => {

    let navigate = useNavigate();

    useEffect(() => {
    localStorage.clear();
    if(localStorage.getItem("user") != null) {
        navigate('/dashboard');
    }
    }, []);

   
    const idUser = useId();
    const idPass = useId();

    const user = useRef(null);
    const pass = useRef(null);
    
    const [Deshabilitado, setHabilitar] = useState(true);

    const HabilitarBoton = () => {
        const userDato = user.current.value;
        const passDato = pass.current.value;

        if (userDato === "" || passDato === "") {
            setHabilitar(true);
        } else {
            setHabilitar(false);
        }
    };

    const ingresar = e => {
        let userDato = user.current.value;
        let passDato = pass.current.value;

        let usuarioArmado = {
            usuario: userDato,
            password: passDato
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
                localStorage.setItem("user", userDato);
                localStorage.setItem("id", json.id);
                localStorage.setItem("apikey", json.apiKey);

                console.log("datos para postman", localStorage);
                

                navigate('/dashboard');
           
            } else {
                toast.error("Usuario y/o contraseña incorrectos", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
                console.log("no se pudo iniciar sesion");             
            };
           
        })

    }

    return (
        <div className='text-center justify-content-center p-5 coso'> 
                <h2>Login</h2>
                <label className='p-1' htmlFor={idUser}>Usuario: </label>
                <input className='p-1' type="text" id={idUser} ref={user} onChange={HabilitarBoton} />
                <br />
                <label className='p-1' htmlFor={idPass}>Contraseña: </label>
                <input className='p-1' type="password" id={idPass} ref={pass} onChange={HabilitarBoton}/>
                <br />
                <button type="button" onClick={ingresar} disabled={Deshabilitado}>Ingresar</button>
                <br />
                <p>usuario: arbelo
                    <br />
                    contra: 12345
                </p>
                <Link to='/registrar'>Registrate acá</Link>
        </div>
    )
    }

export default Login
