import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadScreen from './LoadScreen';
const Juego = () => {
    const identifierCookie = Cookies.get('userId');
    const newapiUrl="https://jardinsancayetano.free.nf/API/";
    const [recarga, setRecarga] = useState(0);
    const [file, setFile] = useState(null);
    const [cords, setCords] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [mixedOptions, setMixedOptions] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [final, setFinal] = useState(false);
    const [collage, setCollage] = useState(null);
    const [loading, setLoading] = useState(false);
    const fotoForm = useRef(null);
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        Axios.get(newapiUrl+"Juego/comprobarCamino.php", {
            params: {userId: identifierCookie}
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
    }, []);
    
    useEffect(() => {
        Axios.get(newapiUrl + "Juego/obtenerCamino.php", {
            params: { userId: identifierCookie }
        }).then((result) => {
            if (result.data) {
                const cordsData = result.data.cords || []; 
                const pistasData = result.data.pistas || [];
            
                setCords(cordsData);
                setPistas(pistasData);
            
                if (cordsData.length > 0) {
                    const mixed = cordsData.flatMap(cord => [
                        { text: cord.cords_titulo, isCorrect: true },
                        { text: cord.cords_fake1, isCorrect: false },
                        { text: cord.cords_fake2, isCorrect: false }
                    ]).sort(() => Math.random() - 0.5);
            
                    setMixedOptions(mixed);
                    setShowForm(false);
                } else {
                    setCollage(result.data.collage);
                }
            } else {
                console.error("Los datos de la API no están definidos.");
            }
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
    }, [recarga]);

    useEffect(() => {
        if (collage) {
            setFinal(true);
        }
    }, [collage]);
    
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

    const handleClick = (index, isCorrect) => {
        // Si el botón es correcto, mostrar el formulario
        if (isCorrect) {
            setShowForm(true);
        }
        // Agregar el índice del botón clicado a la lista
        setClickedButtons(prev => [...prev, index]);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        setLoading(true);
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
                        setTimeout(() => {
                            setLoading(false); 
                        }, 1000);
                        setClickedButtons([]);
                        setRecarga(recarga+1);
                        setFile(null);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }
                }).catch((error) => {
                    console.error("Hubo un error al avanzar.", error);
                });
        }
    }

    const downloadCollage = () => {
        if (collage) {
            const link = document.createElement('a');
            link.href = `data:image/png;base64,${collage}`;
            link.download = 'collage.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            const formData = new FormData();
            formData.append('idUser', identifierCookie);
            formData.append('idRuta', 1);
            Axios.post(newapiUrl + "Juego/terminarJuego.php", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch((error) => {
                console.error("Hubo un error al terminar el juego.", error);
            });
        }
    };

    if(loading){
        return <LoadScreen/>;
    }

    return (
        <div>
            {final ? (
                <div>
                    {collage && (
                        <div>
                            <img className='w-96 h-96' src={`data:image/png;base64,${collage}`} alt="Collage" />
                            <button className='w-40 text-white bg-green-500 rounded-full p-2 my-3' onClick={downloadCollage}>Descargar Collage</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {pistas.map(pista => (
                        <div key={pista.pistas_id}>
                            <img className='w-96 h-96' src={pista.pistas_img} alt="" />
                            <p>{pista.pistas_desc}</p>
                        </div>
                    ))}
                    {mixedOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index, option.isCorrect)}
                            className={`m-2 p-2 rounded ${clickedButtons.includes(index) ? (option.isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-300'}`}
                        >
                            {option.text}
                        </button>
                    ))}
                    {showForm && (
                        <form ref={fotoForm} className='justify-items-center' onSubmit={handleSubmit}>
                            <input
                                type="file"
                                accept="image/*"
                                name='foto'
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                            <button className='w-40 text-white bg-green-500 rounded-full p-2 mt-8' type="submit">Subir Foto</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default Juego