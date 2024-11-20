import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import LoadScreen from '../components/LoadScreen';
import Modal from '../components/Modal';
import logo from '../assets/logoapp.png';
const Login = () => {
    const [loading, setLoading] = useState(true);
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [nombreForm, setNombreForm] = useState('');
    const [numeroForm, setNumeroForm] = useState('');
    const textoModal = "Bienvenidos al juego que te permitirá conocer y recorrer algunos lugares de nuestra ciudad. Una vez que te registraste con tu nombre (usuario) y número de teléfono (contraseña), solo tenés que ir leyendo las pistas que los niños/as te van dando, si conocés de qué se trata te invitamos a ir hasta el lugar y sacarte una foto allí para subirla, también podés subir una que ya tengas guardada o buscar una foto del lugar por las redes. Son 12 maravillosos lugares de nuestra ciudad para recorrerlos, al final se armará un collage con las fotos que subiste y podrás descargarlo para enviarlo a quien prefieras. ¡¡Animate a recorrer nuestra ciudad de manera digital!!!!";

    const loguear = (e)=>{
        e.preventDefault();
        if(numeroForm>999999999 && numeroForm<10000000000){
            Axios.post(newapiUrl+"Usuarios/loguearUsuario.php", {
                userNombre: nombreForm,
                userNumero: numeroForm
            }).then((result) => {
                if(result.data.success){
                    Cookies.set('numero', numeroForm, { expires: 7 });
                    alert("Usuario logueado con exito");
                    if(result.data.rank==1){
                        window.location.replace("/Admin");
                    }else{
                        window.location.replace("/");
                    }
                }else{
                    alert("Usuario no ha sido encontrado");
                }
            }).catch((error) => {
                console.error("Hubo un error al iniciar sesión", error);
            });
        }else{
            alert("Número de telefono invalido");
        }
    }

    useEffect(() => {
        const numeroCookie = Cookies.get('numero');
        if(numeroCookie){
            window.location.replace("/");
        }else{
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }, []);

    if (loading) {
        return <LoadScreen/>;
    }
  
    return (
        <div className="grid text-lg justify-items-center align-center mt-12 mb-32">
            {/* Título de la página */}
            <h2 className="text-4xl text-green-600 mt-5 mb-4 text-center">Iniciar Sesión</h2>
            
            {/* Imagen del logo con texto alternativo */}
            <img className="mb-2 w-36 h-36" src={logo} alt="Logo del Jardín" />
            
            {/* Formulario de inicio de sesión */}
            <form className="mt-8 grid text-center" onSubmit={loguear} aria-label="Formulario de inicio de sesión">
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
                <input
                type="number"
                id="numero"
                required
                className="my-2 border-b-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={numeroForm}
                onChange={(e) => setNumeroForm(e.target.value)}
                aria-required="true"
                />
                
                {/* Enlace para registrarse */}
                <a
                className="mt-4 text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
                href="/Register"
                role="button"
                aria-label="Registrarse en el sistema"
                tabindex="0"
                >
                Registrarse
                </a>
                
                {/* Botón de envío */}
                <input
                type="submit"
                value="Iniciar sesión"
                className="mt-2 border-2 text-green-700 p-2 rounded-full border-green-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Enviar formulario para iniciar sesión"
                />
            </form>

            <div className="mt-6">
                {/* Pasar el texto como prop */}
                <Modal content={textoModal} />
            </div>
        </div>
    )
}

export default Login;