import { useDispatch, useSelector } from "react-redux";
import { eliminarEvento } from "../features/eventosSlice";
import { useEffect, useState } from "react";
import { eliminarUltimoBiberon, setTiempoUltimoBiberon } from "../features/biberonSlice";

const Evento = ({id, detalle, idCategoria}) => {
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.categorias.categorias)
    const [img, setImg] = useState('');
    const anteUltimo = useSelector(state => state.biberon.anteUltimoBiberon);
    const eventos = useSelector(state => state.eventos.eventos);

    useEffect(() => {
        if(categorias != null){
            if(idCategoria != '' && idCategoria != null){
                const catEncontrada = categorias.find(c => c.id === idCategoria);   
                setImg(catEncontrada.imagen);
            }
        }
    }, [])

    const eventoPorId = (id) => {
        return eventos.find(evt => evt.id === id);
    };

    const eliminar = () => {    
            fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'apikey': localStorage.getItem('apikey'),
                    'iduser': localStorage.getItem('id')
                },
            })
            .then((response) => response.json())
            .then((json) => {
                const evento = eventoPorId(id);        
                if(evento.idCategoria == 35){
                    dispatch(setTiempoUltimoBiberon(anteUltimo))
                    dispatch(eliminarUltimoBiberon(id));
                }
                dispatch(eliminarEvento(id)); 
            });
    }


    return (
        <li className="list-group-item list-group-item-info">
            <img className="m-2" src={`https://babytracker.develotion.com/imgs/${img}.png`}/>
            {detalle}
            <button className="m-2" id="boton" onClick={eliminar}>Eliminar</button>
        </li> 
    )
}

export default Evento