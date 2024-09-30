import React, { useRef, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import Axios from 'axios';

const Navbar = () => {
  const [isAdmin,setIsAdmin] = useState(false);
  const [isLogued,setIsLogued] = useState(false);
  const listRef = useRef(null);
  const apiUrl="http://localhost:3000/api/";
  const newapiUrl="https://jardinsancayetano.free.nf/API/";

  const cerrarSesion = () =>{
    Cookies.remove('numero');
    window.location.replace("/Login");
  }

  const handleMenu = (e) => {
    let list = listRef.current;
    let target = e.currentTarget;

    if (list) {
      if (target.name === "menu") {
        target.name = "close";
        list.classList.add('hidden');
      } else {
        target.name = "menu";
        list.classList.remove('hidden');
      }
    }
  };

  useEffect(() => {
    const numeroCookie = Cookies.get('numero');
    if(numeroCookie){
      Axios.get(newapiUrl+"Usuarios/comprobarUsuario.php", {
        params: {userNumero: numeroCookie}
      }).then((result) => {
        if(result.data.result){
            setIsLogued(true);    
          if(result.data.result[0].users_id==1){ 
            setIsAdmin(true);
          }
        }
      });
    }
  }, []);

  if (!isLogued) {
    return null;
  }

  return (
    <nav className='p-5 text-green-400 md:flex md:justify-between'>
      
      <span className='text-3xl cursor-pointer mx-2 md:hidden block'>
        <i name="menu" className="fa-solid fa-bars" onClick={()=>{handleMenu(event)}}></i>
      </span>
      
      <ul ref={listRef} className='text-green-400 md:flex md:justify-between md:w-full md:items-center z-[-1] md:z-auto md:static 
      left-0 w-full md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 top-[-400px] transition-all ease-in duration-500 hidden'>
        <ul className='md:flex md:items-center'>
          {!isAdmin && (
            <li className='mx-4 my-6 md:my-0'>
              <a className='text-xl' href="/">Inicio</a>
            </li>
          )}
          {isAdmin && (
            <li className='mx-4 my-6 md:my-0'>
              <a className='text-xl' href="/Admin">Admin Menu</a>
            </li>
          )}
        </ul>    
        
        <button className='bg-green-500 text-white px-6 py-2 mx-4 hover:bg-green-600' onClick={()=>{cerrarSesion()}}>Cerrar Sesión</button>      
      
      </ul>
    </nav>
  )
}

export default Navbar;
