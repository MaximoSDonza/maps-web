import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadScreen from '../components/LoadScreen';
import mapa from '../assets/mapJunin.png';
const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState([]);
    const [lugares, setLugares] = useState([]);
    const eventoForm = useRef(null);
    const lugarForm = useRef(null);
    const pistaForm = useRef(null);
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    
    const [cookieValue, setCookieValue] = useState('');
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    
    useEffect(()=>{
        const emailCookie = Cookies.get('email');
        setCookieValue(emailCookie);
        if(emailCookie){
            Axios.get(newapiUrl+"Usuarios/comprobarUsuario.php", {
                params: {userEmail: emailCookie}
            }).then((result) => {
                if(result.data.result.length>0){    
                    if(result.data.result[0].users_id!=1){
                        window.location.replace("/");
                    }else{
                        setLoading(false);
                    }
                }else{
                    window.location.replace("/");
                }
            }).catch((error) => {
                console.error("Hubo un error al comprobar usuario", error);
            });
        }else{
            window.location.replace("/");
        }
    }, []);
    
    useEffect(() => {
        Axios.get(newapiUrl+"Rutas/obtenerRutas.php").then((result) => {
            setEventos(result.data.rutas);
        }).catch((error) => {
            console.error("Hubo un error al comprobar los eventos", error);
        });

        Axios.get(newapiUrl+"Cordenadas/obtenerCordenadas.php").then((result) => {
            setLugares(result.data.cords);
        }).catch((error) => {
            console.error("Hubo un error al comprobar los eventos", error);
        });
    }, []);

    const agregarEvento = () =>{
        if(eventoForm.current.classList.contains('hidden')){
            if(!lugarForm.current.classList.contains('hidden')){
                lugarForm.current.classList.add('hidden');
            }
            
            if(!pistaForm.current.classList.contains('hidden')){
                pistaForm.current.classList.add('hidden');
            }
            eventoForm.current.classList.remove('hidden');
        }
        
    }

    const agregarLugar = () =>{
        if(lugarForm.current.classList.contains('hidden')){
            if(!eventoForm.current.classList.contains('hidden')){
                eventoForm.current.classList.add('hidden');
            }

            if(!pistaForm.current.classList.contains('hidden')){
                pistaForm.current.classList.add('hidden');
            }

            lugarForm.current.classList.remove('hidden');
        }
    }

    const agregarPista = () =>{
        if(pistaForm.current.classList.contains('hidden')){
            if(!lugarForm.current.classList.contains('hidden')){
                lugarForm.current.classList.add('hidden');
            }
            
            if(!eventoForm.current.classList.contains('hidden')){
                eventoForm.current.classList.add('hidden');
            }

            pistaForm.current.classList.remove('hidden');
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const donde = event.target.elements.form.value;
        
        switch (donde) {
            case 'evento':
                Axios.post(newapiUrl+"Rutas/crearRuta.php", {
                    nombreRuta:event.target.elements.nombre.value
                }).then((result) => {
                   if(result){
                    alert("Evento creado con exito.")
                   }
                }).catch((error) => {
                    console.error("Hubo un error al crear el evento", error);
                });
                break;
            case 'lugar':
                Axios.post(newapiUrl+"Cordenadas/crearCordenada.php", {
                    cordTitulo: event.target.elements.nombre.value,
                    cordRuta: event.target.elements.evento.value,
                    cordLongitud: event.target.elements.longitud.value,
                    cordLatitud: event.target.elements.latitud.value
                }).then((result) => {
                   if(result.data.success){
                    alert("Lugar creado con exito.")
                   }else{
                    alert(result.data.error)
                   }
                }).catch((error) => {
                    console.error("Hubo un error al crear el evento", error);
                });
                break;
            case 'pista':
                Axios.post(newapiUrl+"Pistas/crearPista.php", {
                    pistaDesc:event.target.elements.pista.value,
                    pistaCord:event.target.elements.lugar.value
                }).then((result) => {
                   if(result){
                    alert("Pista creada con exito.")
                   }
                }).catch((error) => {
                    console.error("Hubo un error al crear la pista", error);
                });
                break;
        }
    }

    if (loading) {
        return <LoadScreen/>;
    }

  return (
    <div className='w-full text-center flex flex-col justify-center items-center mt-12 mb-32'>
        
        <div className='flex flex-col lg:flex-row lg:gap-8 gap-1'>
            <button className='w-40 text-white bg-green-500 rounded-full p-2 my-3' onClick={()=>agregarEvento()} >Agregar Evento</button>
            
            <button className='w-40 text-white bg-green-500 rounded-full p-2 my-3' onClick={()=>agregarLugar()} >Agregar Lugar</button>
            
            <button className='w-40 text-white bg-green-500 rounded-full p-2 my-3' onClick={()=>agregarPista()} >Agregar Pista</button>
        </div>

        <form ref={eventoForm} onSubmit={handleSubmit} className="  grid justify-items-center  hidden w-80 mt-14" action="">
            <h2 className='text-xl mb-8'>Agregar Evento</h2>
            <label htmlFor="">Nombre del Evento</label>
            <input className='border-b-2 border-green-400' name='nombre' type="text" />
            <input type="text" name="form" value='evento' hidden />
            <input className='w-40 text-white bg-green-500 rounded-full p-2 mt-5' type="submit" />
        </form>

        
        <form ref={lugarForm} onSubmit={handleSubmit} className="grid justify-items-center alig-center hidden w-80 mt-14" action="">
            <h2 className='text-xl mb-8'>Agregar Lugar</h2>
            <label htmlFor="">Seleccionar Evento</label>
            <select name="evento" id="">
                    {eventos.map(evento => (
                        <option key={evento.rutas_id} value={evento.rutas_id}>
                            {evento.rutas_nombre}
                        </option>
                    ))}
            </select>
            <img className='mt-4 w-96 h-72' src={mapa} alt="Mapa de Junin" />
            <label className='mt-4' htmlFor="">Nombre del Lugar</label>
            <input className='border-b-2 border-green-400 mt-2' type="text" name="nombre" />
            <label className='mt-4' htmlFor="">Longitud</label>
            <input className='border-b-2 border-green-400 mt-2' type="text" name="longitud" />
            <label className='mt-4' htmlFor="">Latitud</label>
            <input className='border-b-2 border-green-400 mt-2' type="text" name="latitud" />
            <input className='border-b-2 border-green-400 mt-2' type="text" name="form" value='lugar' hidden />
            <input className='w-40 text-white bg-green-500 rounded-full p-2 mt-5' type="submit" />
        </form>

        <form ref={pistaForm} onSubmit={handleSubmit} className="grid justify-items-center alig-center hidden w-80 mt-14" action="">
            <h2 className='text-xl mb-8'>Agregar Pista</h2>
            <label htmlFor="">Seleccionar Lugar</label>
            <select name="lugar" id="">
                {lugares.map(lugar => (
                        <option key={lugar.cords_id} value={lugar.cords_id}>
                            {lugar.cords_titulo}
                        </option>
                    ))}
            </select>
            <label className='mt-4' htmlFor="">Descripción de la Pista</label>
            <input className='border-b-2 border-green-400 mt-2' type="text" name='pista' />
            <input type="text" name="form" value='pista' hidden />
            <input className='w-40 text-white bg-green-500 rounded-full p-2 mt-5' type="submit" />
        </form>
    </div>
  )
}

export default Admin;