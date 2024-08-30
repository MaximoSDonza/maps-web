import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Cookies from 'js-cookie';
const Home = () => {
    const [cookieValue, setCookieValue] = useState('');
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [file, setFile] = useState(null);
    const apiUrl="http://localhost:3000/api/";
    useEffect(() => {
        const emailCookie = Cookies.get('email');
        setCookieValue(emailCookie);
        if(emailCookie){
            Axios.get(apiUrl+"Usuarios/ComprobarUsuario", {
                params: {userEmail: emailCookie}
            }).then((result) => {
                if(result.data.length>0){
                    setUserId(result.data[0].users_id);    
                    setUserName(result.data[0].users_nombre); 
                }else{
                    window.location.replace("/Login");
                }
            }).catch((error) => {
                console.error("Hubo un error al comprobar usuario", error);
            });
        }else{
            window.location.replace("/Login");
        }

        Axios.get(apiUrl+"Rutas/ObtenerRutas").then((result) => {
            setEventos(result.data);
        }).catch((error) => {
            console.error("Hubo un error al comprobar los eventos", error);
        });

    }, []); 
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        if(!isPlaying){
            console.log(event.target.elements.evento.value);
            setIsPlaying(true);
        }else{
            if (file) {
                console.log('Archivo seleccionado:', file);
            }
        }

    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          // Verifica si el archivo es una imagen
          if (selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
          } else {
            alert('Por favor, selecciona un archivo de imagen.');
          }
        }
    };


    return (
        <div className='grid text-center justify-center mt-12 mb-32'>
            {!isPlaying ? (
                <>
                    <h2 className='text-2xl mb-14'>Hola <b>{userName}</b></h2>
                    <h2 className='text-xl'><b>Eventos</b></h2>
                    <form className='grid justify-items-center' onSubmit={handleSubmit}>
                        <select name="evento" id="">
                            {eventos.map(evento => (
                                <option key={evento.rutas_id} value={evento.rutas_id}>
                                    {evento.rutas_nombre}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="rounded-full w-20 h-20 p-4 bg-green-300 mt-32 submit"
                        >
                            <i className="fa-solid fa-play"></i>
                        </button>
                    </form>
                </>
            ) : (
                <div className='playing-indicator'>
                    <form className='grid justify-items-center' onSubmit={handleSubmit} action="">
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                        />
                        <button className='w-40 text-white bg-green-500 rounded-full p-2 mt-8' type="submit">Subir Foto</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Home;