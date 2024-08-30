import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Cookies from 'js-cookie';
const Home = () => {
    const [cookieValue, setCookieValue] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
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
    }, []);  

    return (
        <div>
            <h2>Hola {userName}</h2>
            <h2>Actividades</h2>
        </div>
    )
}

export default Home;