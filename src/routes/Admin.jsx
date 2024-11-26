import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadScreen from '../components/LoadScreen';
const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState([]);
    const [historialPuntos, setHistorialPuntos] = useState([]);
    const [historialTerminados, setHistorialTerminados] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [lugares, setLugares] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const [file, setFile] = useState(null);
    const [recarga, setRecarga] = useState(0);

    const historialLogin = useRef(null);
    const historialProgreso = useRef(null);
    const historialTerminado = useRef(null);
    const eventoForm = useRef(null);
    const enviarLugarForm = useRef(null);
    const enviarPistaForm = useRef(null);
    const verPistaDiv = useRef(null);
    const verLugarDiv = useRef(null);
    
    const [cookieValue, setCookieValue] = useState('');
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    
    useEffect(()=>{
        const numeroCookie = Cookies.get('userid');
        setCookieValue(numeroCookie);
        if(numeroCookie){
            Axios.get(newapiUrl+"Usuarios/comprobarUsuario.php", {
                params: {userId: numeroCookie}
            }).then((result) => {
                if(result.data.success){    
                    setLoading(false);
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
        // Axios.get(newapiUrl+"Rutas/obtenerRutas.php").then((result) => {
        //     setEventos(result.data.rutas);
        // }).catch((error) => {
        //     console.error("Hubo un error al comprobar los eventos", error);
        // });

        Axios.get(newapiUrl+"Cordenadas/obtenerCordenadas.php").then((result) => {
            setLugares(result.data.cords);
        }).catch((error) => {
            console.error("Hubo un error al comprobar las cordenadas", error);
        });

        Axios.get(newapiUrl+"Pistas/obtenerPistas.php").then((result) => {
            setPistas(result.data.pistas);
        }).catch((error) => {
            console.error("Hubo un error al comprobar las pistas", error);
        });

        Axios.get(newapiUrl+"Historial/obtenerHistorialLogin.php").then((result) => {
            setHistorial(result.data.historial);
        }).catch((error) => {
            console.error("Hubo un error al comprobar el historial", error);
        });

        Axios.get(newapiUrl+"Historial/obtenerHistorialProgreso.php").then((result) => {
            setHistorialPuntos(result.data.historial);
        }).catch((error) => {
            console.error("Hubo un error al comprobar el historial", error);
        });

        Axios.get(newapiUrl+"Historial/obtenerHistorialTerminados.php").then((result) => {
            setHistorialTerminados(result.data.historial);
        }).catch((error) => {
            console.error("Hubo un error al comprobar el historial", error);
        });
        
    }, [recarga]);

    // MOSTRAR ESCONDER
    
    const verHistorialTerminado = () =>{
        if(historialTerminado.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }
            
            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            historialTerminado.current.classList.remove('hidden');
        }
        
    }
    
    const verHistorialLogin = () =>{
        if(historialLogin.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }
            
            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            historialLogin.current.classList.remove('hidden');
        }
        
    }

    const verHistorialProgreso = () =>{
        if(historialProgreso.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }
            
            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            historialProgreso.current.classList.remove('hidden');
        }
        
    }
    
    // const agregarEvento = () =>{
    //     if(eventoForm.current.classList.contains('hidden')){
    //         if(!enviarLugarForm.current.classList.contains('hidden')){
    //             enviarLugarForm.current.classList.add('hidden');
    //         }
            
    //         if(!enviarPistaForm.current.classList.contains('hidden')){
    //             enviarPistaForm.current.classList.add('hidden');
    //         }
    //         eventoForm.current.classList.remove('hidden');
    //         if(!verLugarDiv.current.classList.contains('hidden')){
    //              verLugarDiv.current.classList.add('hidden');
    //         }

    // if(!verPistaDiv.current.classList.contains('hidden')){
    //     verPistaDiv.current.classList.add('hidden');
    // }
    //     }
        
    // }

    const agregarLugar = () =>{
        if(enviarLugarForm.current.classList.contains('hidden')){
            // if(!eventoForm.current.classList.contains('hidden')){
            //     eventoForm.current.classList.add('hidden');
            // }

            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            enviarLugarForm.current.classList.remove('hidden');
        }
    }

    const agregarPista = () =>{
        if(enviarPistaForm.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }
            
            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            // if(!eventoForm.current.classList.contains('hidden')){
            //     eventoForm.current.classList.add('hidden');
            // }

            enviarPistaForm.current.classList.remove('hidden');
        }
    }

    const verLugares = () =>{
        if(verLugarDiv.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }

            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }
            
            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            if(!verPistaDiv.current.classList.contains('hidden')){
                verPistaDiv.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            // if(!eventoForm.current.classList.contains('hidden')){
            //     eventoForm.current.classList.add('hidden');
            // }

            verLugarDiv.current.classList.remove('hidden');
        }
    }

    const verPistas = () =>{
        if(verPistaDiv.current.classList.contains('hidden')){
            if(!enviarLugarForm.current.classList.contains('hidden')){
                enviarLugarForm.current.classList.add('hidden');
            }

            if(!enviarPistaForm.current.classList.contains('hidden')){
                enviarPistaForm.current.classList.add('hidden');
            }
            
            if(!historialLogin.current.classList.contains('hidden')){
                historialLogin.current.classList.add('hidden');
            }

            if(!verLugarDiv.current.classList.contains('hidden')){
                verLugarDiv.current.classList.add('hidden');
            }

            if(!historialProgreso.current.classList.contains('hidden')){
                historialProgreso.current.classList.add('hidden');
            }

            if(!historialTerminado.current.classList.contains('hidden')){
                historialTerminado.current.classList.add('hidden');
            }

            // if(!eventoForm.current.classList.contains('hidden')){
            //     eventoForm.current.classList.add('hidden');
            // }

            verPistaDiv.current.classList.remove('hidden');
        }
    }
    // MOSTRAR ESCONDER

    // HANDLE
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

    const handleSubmit = (event) =>{
        event.preventDefault();
        const donde = event.target.elements.form.value;
        
        switch (donde) {
            case 'evento':
                Axios.post(newapiUrl+"Rutas/crearRuta.php", {
                    nombreRuta:event.target.elements.nombre.value
                }).then((result) => {
                   if(result){
                    alert("Evento creado con exito.");
                    setRecarga(recarga+1);
                   }
                }).catch((error) => {
                    console.error("Hubo un error al crear el evento", error);
                });
                break;
            case 'lugar':
                Axios.post(newapiUrl+"Cordenadas/crearCordenada.php", {
                    cordTitulo: event.target.elements.nombre.value,
                    cordRuta: 1,
                    cordFake1: event.target.elements.fake1.value,
                    cordFake2: event.target.elements.fake2.value
                }).then((result) => {
                   if(result.data.success){
                    alert("Lugar creado con exito.");
                    setRecarga(recarga+1);
                   }else{
                    alert(result.data.error)
                   }
                }).catch((error) => {
                    console.error("Hubo un error al crear el lugar", error);
                });
                break;
            case 'pista':
                const formData = new FormData();
                formData.append('pistaDesc', event.target.elements.pista.value);
                formData.append('pistaCord', event.target.elements.lugar.value);
                formData.append('file', file);

                Axios.post(newapiUrl + "Pistas/crearPista.php", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    if (result) {
                        alert("Pista creada con éxito.");
                        setRecarga(recarga+1);
                    }
                }).catch((error) => {
                    console.error("Hubo un error al crear la pista", error);
                });
                break;
        }
    }
    // HANDLE
    
    // ELIMINAR

    const eliminarPista = (idPista)=> {
        const formData = new FormData();
        formData.append('idPista', idPista);

        Axios.post(newapiUrl + "Pistas/eliminarPista.php", formData)
        .then((result) => {
            if (result.data.success) {
                alert("Pista eliminada con éxito.");
                setRecarga(recarga+1);
            } else {
                alert("ERROR al eliminar Pista.");
            }
        }).catch((error) => {
            console.error("Hubo un error al eliminar la pista", error);
        });
    }

    const eliminarLugar = (idCord)=> {
        const formData = new FormData();
        formData.append('idCord', idCord);

        Axios.post(newapiUrl + "Cordenadas/eliminarCordenada.php", formData)
        .then((result) => {
            if (result.data.success) {
                alert("Lugar eliminado con éxito.");
                setRecarga(recarga+1);
            } else {
                alert("ERROR al eliminar Lugar.");
            }
        })
        .catch((error) => {
            console.error("Hubo un error al eliminar el lugar", error);
        });
    }

    // ELIMINAR

    //PANTALLA DE CARGA
    if (loading) {
        return <LoadScreen/>;
    }

  return (
    <div className="w-full text-lg text-center flex flex-col justify-center items-center mt-12 mb-32">

        {/* Botones de acciones */}
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-1">
            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={verHistorialLogin} aria-label="Ver historial de sesión">
            Historial de Sesión
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={verHistorialProgreso} aria-label="Ver usuarios en progreso">
            Ver usuarios en progreso
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={verHistorialTerminado} aria-label="Ver usuarios terminados">
            Ver usuarios terminados
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={agregarLugar} aria-label="Agregar lugar">
            Agregar Lugar
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={verLugares} aria-label="Ver lugares">
            Ver Lugares
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={agregarPista} aria-label="Agregar pista">
            Agregar Pista
            </button>

            <button className="w-40 text-white bg-green-500 rounded-full p-2 my-3" onClick={verPistas} aria-label="Ver pistas">
            Ver Pistas
            </button>
        </div>

        {/* Tablas de datos */}
        <div ref={historialTerminado} className="grid justify-items-center hidden w-80 mt-14" aria-live="polite">
            <table aria-label="Historial de usuarios terminados">
            <thead>
                <tr>
                <th>Usuario</th>
                <th>Veces que terminó</th>
                <th>Última vez que terminó</th>
                </tr>
            </thead>
            <tbody>
                {historialTerminados.map((registro) => (
                <tr key={registro.users_nombre}>
                    <td>{registro.users_nombre}</td>
                    <td>{registro.veces_usuario_en_tabla}</td>
                    <td>{registro.ultima_fecha_ingreso}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div ref={historialLogin} className="grid justify-items-center hidden w-80 mt-14" aria-live="polite">
            <table aria-label="Historial de sesiones de usuarios">
            <thead>
                <tr>
                <th>Usuario</th>
                <th>Última Fecha de Ingreso</th>
                </tr>
            </thead>
            <tbody>
                {historial.map((registro) => (
                <tr key={registro.hLogin_id}>
                    <td>{registro.users_nombre}</td>
                    <td>{registro.ultima_fecha_logueo}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div ref={historialProgreso} className="grid justify-items-center hidden w-80 mt-14" aria-live="polite">
            <table aria-label="Usuarios en progreso">
            <thead>
                <tr>
                <th>Usuario</th>
                <th>Punto</th>
                <th>Última vez que Jugó</th>
                </tr>
            </thead>
            <tbody>
                {historialPuntos.map((registro) => (
                <tr key={registro.hActividad_id}>
                    <td>{registro.users_nombre}</td>
                    <td>{registro.position} {registro.cords_titulo}</td>
                    <td>{registro.hRuta_fechaUlt}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Sección de pistas */}
        <div className="grid justify-items-center hidden w-80 mt-14" ref={verPistaDiv} aria-live="polite">
            {pistas.map((pista) => (
            <div className="mt-5" key={pista.pistas_id}>
                <p>Pertenece a: {pista.cords_titulo}</p>
                <p>{pista.pistas_desc}</p>
                <img className="w-96 h-96" src={pista.pistas_img} alt="Imagen de la pista" />
                <button className="w-40 text-white bg-red-600 rounded-full p-2 mt-3" onClick={() => eliminarPista(pista.pistas_id)} aria-label={`Eliminar pista ${pista.pistas_desc}`}>
                Eliminar
                </button>
            </div>
            ))}
        </div>

        {/* Sección de lugares */}
        <div className="grid justify-items-center hidden w-80 mt-14" ref={verLugarDiv} aria-live="polite">
            <p>Al eliminar un lugar, se eliminarán sus pistas.</p>
            {lugares.map((lugar) => (
            <div className="mt-5" key={lugar.cords_id}>
                <p>{lugar.cords_titulo}</p>
                <p>Lugar Falso 1: {lugar.cords_fake1}</p>
                <p>Lugar Falso 2: {lugar.cords_fake2}</p>
                <button className="w-40 text-white bg-red-600 rounded-full p-2 mt-3" onClick={() => eliminarLugar(lugar.cords_id)} aria-label={`Eliminar lugar ${lugar.cords_titulo}`}>
                Eliminar
                </button>
            </div>
            ))}
        </div>

        {/* Formularios de entrada */}
        <form ref={eventoForm} onSubmit={handleSubmit} className="grid justify-items-center hidden w-80 mt-14" aria-label="Formulario para agregar evento">
            <h2 className="text-xl mb-8">Agregar Evento</h2>
            <label htmlFor="nombreEvento">Nombre del Evento</label>
            <input className="border-b-2 border-green-400" id="nombreEvento" name="nombre" type="text" required />
            <input type="text" name="form" value="evento" hidden />
            <input className="w-40 text-white bg-green-500 rounded-full p-2 mt-5" type="submit" value="Agregar" />
        </form>

        <form ref={enviarLugarForm} onSubmit={handleSubmit} className="grid justify-items-center hidden w-80 mt-14" aria-label="Formulario para agregar lugar">
            <h2 className="text-xl mb-8">Agregar Lugar</h2>
            <label htmlFor="nombreLugar" className="mt-4">Nombre del Lugar</label>
            <input className="border-b-2 border-green-400 mt-2" id="nombreLugar" name="nombre" type="text" required />
            <label htmlFor="nombreFalso1" className="mt-4">Nombre de lugar falso 1</label>
            <input className="border-b-2 border-green-400 mt-2" id="nombreFalso1" name="fake1" type="text" />
            <label htmlFor="nombreFalso2" className="mt-4">Nombre de lugar falso 2</label>
            <input className="border-b-2 border-green-400 mt-2" id="nombreFalso2" name="fake2" type="text" />
            <input type="text" name="form" value="lugar" hidden />
            <input className="w-40 text-white bg-green-500 rounded-full p-2 mt-5" type="submit" value="Agregar" />
        </form>

        <form ref={enviarPistaForm} onSubmit={handleSubmit} className="grid justify-items-center hidden w-80 mt-14" aria-label="Formulario para agregar pista">
            <h2 className="text-xl mb-8">Agregar Pista</h2>
            <label htmlFor="seleccionarLugar">Seleccionar Lugar</label>
            <select name="lugar" id="seleccionarLugar">
            {lugares.map((lugar) => (
                <option key={lugar.cords_id} value={lugar.cords_id}>
                {lugar.cords_titulo}
                </option>
            ))}
            </select>
            <label htmlFor="subirImagen" className="mt-4">Imagen de la Pista</label>
            <input
            id="subirImagen"
            className="mt-2"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            />
            <label htmlFor="descripcionPista" className="mt-4">Descripción de la Pista</label>
            <input className="border-b-2 border-green-400 mt-2" id="descripcionPista" name="pista" type="text" />
            <input type="text" name="form" value="pista" hidden />
            <input className="w-40 text-white bg-green-500 rounded-full p-2 mt-5" type="submit" value="Agregar" />
        </form>
    </div>
  )
}

export default Admin;