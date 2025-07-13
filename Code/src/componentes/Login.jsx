import { useEffect, useId } from 'react';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';



const Login = () => {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        if (localStorage.getItem("user") != null) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const idUser = useId();
    const idPass = useId();

    const user = useRef(null);
    const pass = useRef(null);

    const [Deshabilitado, setHabilitar] = useState(true);

    const HabilitarBoton = () => {
        const userDato = user.current.value;
        const passDato = pass.current.value;
        setHabilitar(userDato === "" || passDato === "");
    };

    const ingresar = e => {
        setLoading(true);
        let userDato = user.current.value;
        let passDato = pass.current.value;

        let usuarioArmado = {
            usuario: userDato,
            password: passDato
        }

        fetch('https://babytracker.develotion.com/login.php', {
            method: 'POST',
            body: JSON.stringify(usuarioArmado),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.codigo === 200) {
                    localStorage.setItem("user", userDato);
                    localStorage.setItem("id", json.id);
                    localStorage.setItem("apikey", json.apiKey);

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
                };
            }) 
            .finally(() => {
                setLoading(false);
            });
    }

   return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      

      {/* Formulario de Login */}
      <div className="col-md-4">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
            <div className="mb-3">
              <label htmlFor={idUser} className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id={idUser}
                ref={user}
                onChange={HabilitarBoton}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={idPass} className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id={idPass}
                ref={pass}
                onChange={HabilitarBoton}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="d-grid mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={ingresar}
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </div>
            <div className="text-center">
              <Link to='/registrar'>¿No tienes cuenta? Regístrate acá</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
           {/* Recuadro de Usuario demo */}
    <div className="row justify-content-center">
      <div className="col-md-4 m-4">
        <div className="card border-info">
          <div className="card-header bg-info text-white">
            Usuario demo
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Usuario:</strong> arbelo <br />
              <strong>Contraseña:</strong> 12345
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
);

}

export default Login;
