import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import Axios from 'axios';
const Admin = () => {
    const [cookieValue, setCookieValue] = useState('');
    const apiUrl="http://localhost:3000/api/";
    useEffect(() => {
        const emailCookie = Cookies.get('email');
        setCookieValue(emailCookie);
        if(emailCookie){
            Axios.get(apiUrl+"Usuarios/ComprobarUsuario", {
                params: {userEmail: emailCookie}
            }).then((result) => {
                if(result.data.length>0){    
                    if(result.data[0].users_id!=1){
                        window.location.replace("/");
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
  return (
    <div className='mb-32'>
        Admin menu
    </div>
  )
}

export default Admin;