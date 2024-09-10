import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import LoadScreen from '../components/LoadScreen';
import logo from '../assets/sancayetanoo.png';
const Login = () => {
    const [loading, setLoading] = useState(true);
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [nombreForm, setNombreForm] = useState('');
    const [numeroForm, setNumeroForm] = useState('');

    const loguear = (e)=>{
        e.preventDefault();
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
    }

    useEffect(() => {
        const numeroCookie = Cookies.get('numero');
        if(numeroCookie){
            window.location.replace("/");
        }else{
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <LoadScreen/>;
    }
  
    return (
        <div className='grid justify-items-center alig-center mt-12 mb-32'>
        
            <h2 className="text-4xl text-green-600 mt-5 mb-4 text-center">Iniciar Sesión</h2>
            <img className="mb-2 w-36 h-36" src={logo} alt="LogoJardin" />
            <form className='mt-8 grid text-center' onSubmit={loguear}>
                <label htmlFor="nombre">Ingrese su Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    required 
                    className='my-2 border-b-2 border-green-400'
                    onChange={(e) => setNombreForm(e.target.value)}
                    value={nombreForm}/>
                <label htmlFor="numero">Ingrese su Número de Telefono</label>
                <input
                    type="number"
                    id="numero"
                    required
                    className='my-2 border-b-2 border-green-400'
                    value={numeroForm}
                    onChange={(e) => setNumeroForm(e.target.value)}/>
                <a className='mt-4' href="/Register">Registrarse</a>
                <input type="submit" value="Iniciar sesion" className='mt-2 border-2 text-green-700 p-2 rounded-full border-green-500'/>
            </form>
        </div>
    )
}

export default Login;