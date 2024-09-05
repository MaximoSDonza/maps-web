import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Cookies from 'js-cookie';
import LoadScreen from '../components/LoadScreen';
import logo from '../assets/sancayetanoo.png';
const Registrar = () => {
    const [loading, setLoading] = useState(true);
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [emailForm, setEmailForm] = useState('');
    const [claveForm, setClaveForm] = useState('');
    const [nombreForm, setNombreForm] = useState('');

  useEffect(() => {
    const emailCookie = Cookies.get('email');
        if(emailCookie){
            window.location.replace("/");
        }else{
            setLoading(false);
        }
    }, []);

  const registrar = (e)=>{
        e.preventDefault();
        Axios.post(newapiUrl+"Usuarios/registrarUsuario.php", {
            userNombre: nombreForm,
            userEmail: emailForm,
            userClave: claveForm
        }).then((result) => {
            if(result.data.success){
                alert("Usuario registrado con exito");
                window.location.replace("/Login");
            }else{
                alert("Error al registrar usuario");
            }
        }).catch((error) => {
            console.error("Hubo un error al registrarse", error);
        });
  }

    if (loading) {
        return <LoadScreen/>;
    }

  return (
    <div className='grid w-full h-full justify-items-center alig-center mt-12 mb-32'>
        <h2 className="text-4xl text-green-600 mt-5 mb-4 text-center">Registrarse</h2>
        <img className="mb-2 w-36 h-36" src={logo} alt="LogoJardin" />
        <form className='mt-8 grid text-center' onSubmit={registrar}>
        <label htmlFor="nombre">Ingrese su Nombre</label>
            <input 
                type="text"
                id="nombre" 
                className='my-2 border-b-2 border-green-400'
                required
                onChange={(e) => setNombreForm(e.target.value)}
                value={nombreForm}/>
            <label htmlFor="email">Ingrese su Email</label>
            <input 
                type="email"
                id="email" 
                className='my-2 border-b-2 border-green-400'
                required
                onChange={(e) => setEmailForm(e.target.value)}
                value={emailForm}/>
            <label htmlFor="clave">Ingrese su Contraseña</label>
            <input
                type="password"
                id="clave"
                className='my-2 border-b-2 border-green-400'
                required
                value={claveForm}
                onChange={(e) => setClaveForm(e.target.value)}/>
            <a className='mt-4' href="/Login">Iniciar Sesión</a>
            <input type="submit" value="Registrarse" className='mt-2 border-2 text-green-700 border-green-500 p-2 rounded-full'/>
        </form>

    </div>
  )
}

export default Registrar;