import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Cookies from 'js-cookie';
import LoadScreen from '../components/LoadScreen';
import Modal from '../components/Modal';
import logo from '../assets/logoapp.png';
const Registrar = () => {
    const [loading, setLoading] = useState(true);
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [numeroForm, setNumeroForm] = useState('');
    const [nombreForm, setNombreForm] = useState('');
    const textoModal = "Bienvenidos al juego que te permitirá conocer y recorrer algunos lugares de nuestra ciudad. Una vez que te registraste con tu nombre (usuario) y número de teléfono (contraseña), solo tenés que ir leyendo las pistas que los niños/as te van dando, si conocés de qué se trata te invitamos a ir hasta el lugar y sacarte una foto allí para subirla, también podés subir una que ya tengas guardada o buscar una foto del lugar por las redes. Son 12 maravillosos lugares de nuestra ciudad para recorrerlos, al final se armará un collage con las fotos que subiste y podrás descargarlo para enviarlo a quien prefieras. ¡¡Animate a recorrer nuestra ciudad de manera digital!!!!";


  useEffect(() => {
    const numeroCookie = Cookies.get('userid');
        if(numeroCookie){
            window.location.replace("/");
        }else{
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }, []);

  const registrar = (e)=>{
        e.preventDefault();
        if(numeroForm>999999999 && numeroForm<10000000000){
            Axios.post(newapiUrl+"Usuarios/registrarUsuario.php", {
                userNombre: nombreForm,
                userNumero: numeroForm
            }).then((result) => {
                if(result.data.success){
                    alert("Usuario registrado con exito");
                    window.location.replace("/Login");
                }else{
                    alert(`Error al registrar usuario. ${result.data.message}`);
                }
            }).catch((error) => {
                console.error("Hubo un error al registrarse", error);
            });
        }else{
            alert("Número de telefono invalido");
        }
  }

    if (loading) {
        return <LoadScreen/>;
    }

  return (
    <div className="grid text-lg w-full h-full justify-items-center align-center mt-12 mb-32">
        {/* Título de la página */}
        <h2 className="text-4xl text-green-600 mt-5 mb-4 text-center">Registrarse</h2>
        
        {/* Imagen del logo con texto alternativo */}
        <img className="mb-2 w-36 h-36" src={logo} alt="Logo del Jardín" />
        
        {/* Formulario de registro */}
        <form className="mt-8 grid text-center" onSubmit={registrar} aria-label="Formulario de registro">
            {/* Campo de nombre */}
            <label htmlFor="nombre" className="mb-1">
            Ingrese su Nombre
            </label>
            <input
            type="text"
            id="nombre"
            required
            className="my-2 border-b-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setNombreForm(e.target.value)}
            value={nombreForm}
            aria-required="true"
            />
            
            {/* Campo de número de teléfono */}
            <label htmlFor="numero" className="mb-1">
            Ingrese su Número de Teléfono
            </label>
            <label className="text-gray-600" htmlFor="numero">
            Ejemplo: 2364...
            </label>
            <input
            type="number"
            id="numero"
            required
            className="appearance-none my-2 border-b-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={numeroForm}
            onChange={(e) => setNumeroForm(e.target.value)}
            aria-required="true"
            />
            
            {/* Enlace para iniciar sesión */}
            <a
            className="mt-4 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
            href="/Login"
            role="button"
            aria-label="Ir a la página de inicio de sesión"
            tabindex="0"
            >
            Iniciar Sesión
            </a>
            
            {/* Botón de envío */}
            <input
            type="submit"
            value="Registrarse"
            className="mt-2 border-2 text-green-700 border-green-500 p-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Enviar formulario de registro"
            />
        </form>
        <div className="mt-6">
                {/* Pasar el texto como prop */}
                <Modal content={textoModal} />
        </div>
    </div>
  )
}

export default Registrar;