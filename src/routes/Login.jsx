import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const Login = () => {
    const apiUrl="http://localhost:3000/api/";
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [emailForm, setEmailForm] = useState('');
    const [claveForm, setClaveForm] = useState('');
    const loguear = (e)=>{
        e.preventDefault();
        Axios.post(newapiUrl+"Usuarios/loguearUsuario.php", {
            userEmail: emailForm,
            userClave: claveForm
        }).then((result) => {
            if(result.data.success){
                Cookies.set('email', emailForm, { expires: 7 });
                alert("Usuario logueado con exito");
                window.location.replace("/");
            }else{
                alert("Usuario no ha sido encontrado");
            }
        }).catch((error) => {
            console.error("Hubo un error al iniciar sesión", error);
        });
    }

    useEffect(() => {
        const emailCookie = Cookies.get('email');
        if(emailCookie){
            window.location.replace("/");
        }
    }, []);
  
    return (
        <div className='grid justify-center alig-center mt-12 mb-32'>
        
            <h2 className="text-4xl text-green-600 mt-5 mb-8 text-center">Iniciar Sesión</h2>
            <form className='mt-12 grid text-center' onSubmit={loguear}>
                <label htmlFor="email">Ingrese su Email</label>
                <input 
                    type="email"
                    id="email"
                    required 
                    className='my-2 border-b-2 border-green-400'
                    onChange={(e) => setEmailForm(e.target.value)}
                    value={emailForm}/>
                <label htmlFor="clave">Ingrese su Contraseña</label>
                <input
                    type="password"
                    id="clave"
                    required
                    className='my-2 border-b-2 border-green-400'
                    value={claveForm}
                    onChange={(e) => setClaveForm(e.target.value)}/>
                <a className='mt-4' href="/Register">Registrarse</a>
                <input type="submit" value="Iniciar sesion" className='mt-2 border-2 text-green-700 p-2 rounded-full border-green-500'/>
            </form>
        </div>
    )
}

export default Login;