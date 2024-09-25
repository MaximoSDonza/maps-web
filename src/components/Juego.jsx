import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
const Juego = () => {
    const identifierCookie = Cookies.get('userId');
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [file, setFile] = useState(null);
    const [cords, setCords] = useState([]);
    const [pistas, setPistas] = useState([]);
    
    useEffect(() => {
        Axios.get(newapiUrl+"Juego/comprobarCamino.php", {
            params: {userId: identifierCookie}
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
    }, []);
    
    useEffect(() => {
        Axios.get(newapiUrl+"Juego/obtenerCamino.php", {
            params: {userId: identifierCookie}
        }).then((result) => {
            setCords(result.data.cords);
            setPistas(result.data.pistas);
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
    }, []);
    
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
        if(file){
            const formData = new FormData();
                formData.append('user', identifierCookie);
                formData.append('ruta', 1);
                formData.append('file', file);
                formData.append('cord', cords[0].cords_id);

                Axios.post(newapiUrl + "Juego/avanzarJuego.php", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    if (result) {
                        alert("Avanzando con éxito.");
                    }
                }).catch((error) => {
                    console.error("Hubo un error al crear la pista", error);
                });
        }
    }

    return (
        <div>
            {cords.map(cord => (
                        <div key={cord.cords_id}>
                            <p>{cord.cords_titulo}</p>
                            <p>{cord.cords_fake1}</p>
                            <p>{cord.cords_fake2}</p>
                        </div>
                    ))}
            {pistas.map(pista => (
                        <div key={pista.pistas_id}>
                            <img src={pista.pistas_img} alt="" />
                            <p>{pista.pistas_desc}</p>
                        </div>
                    ))}
            <form className='grid justify-items-center' onSubmit={handleSubmit} action="">
                <input
                    type="file"
                    accept="image/*"
                    name='foto'
                    onChange={handleFileChange}
                />
                <button className='w-40 text-white bg-green-500 rounded-full p-2 mt-8' type="submit">Subir Foto</button>
            </form>
        </div>
    )
}

export default Juego