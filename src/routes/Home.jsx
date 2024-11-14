import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Cookies from 'js-cookie';
import LoadScreen from '../components/LoadScreen';
import Juego from '../components/Juego';
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [cookieValue, setCookieValue] = useState('');
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";

    useEffect(() => {
        const numeroCookie = Cookies.get('numero');
        setCookieValue(numeroCookie);
        if(numeroCookie){
            Axios.get(newapiUrl+"Usuarios/comprobarUsuario.php", {
                params: {userNumero: numeroCookie}
            }).then((result) => {
                if(result.data.result.length>0){
                    if(result.data.result[0].users_rango==1){
                        window.location.replace("/Admin");
                    }else{
                        setUserId(result.data.result[0].users_id);
                        Cookies.set('userId', result.data.result[0].users_id, { expires: 7 });    
                        setUserName(result.data.result[0].users_nombre);
                        setTimeout(() => {
                            setLoading(false);
                        }, 1500);
                    } 
                }else{
                    window.location.replace("/Login");
                }
            }).catch((error) => {
                console.error("Hubo un error al comprobar usuario", error);
            });
        }else{
            window.location.replace("/Login");
        }

        Axios.get(newapiUrl+"Rutas/obtenerRutas.php").then((result) => {
            setEventos(result.data.rutas);
        }).catch((error) => {
            console.error("Hubo un error al comprobar los eventos", error);
        });

    }, []); 
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        if(!isPlaying){
            setIsPlaying(true);
        }

    }

    if (loading) {
        return <LoadScreen/>;
    }
    
    return (
        <div className="grid text-lg text-center justify-center mt-12 mb-24">
            {!isPlaying ? (
                <>
                {/* Saludo al usuario */}
                <h2 className="text-2xl mb-14">
                    Hola <b>{userName}</b>
                </h2>

                {/* Formulario para iniciar el juego */}
                <form className="grid justify-items-center" onSubmit={handleSubmit} aria-label="Formulario para iniciar el juego">
                    {/* Campo oculto con el valor de evento */}
                    <input
                    type="number"
                    name="evento"
                    value={1}
                    hidden
                    aria-hidden="true"
                    />

                    <p className="mt-32">¡Vamos a Jugar!</p>

                    {/* Botón de inicio accesible */}
                    <button
                    type="submit"
                    className="rounded-full w-20 h-20 p-4 bg-green-300 mt-4 submit focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Iniciar juego"
                    >
                    <i className="fa-solid fa-play" aria-hidden="true"></i>
                    </button>
                </form>
                </>
            ) : (
                <div className="playing-indicator">
                <Juego />
                </div>
            )}
        </div>
    )
}

export default Home;