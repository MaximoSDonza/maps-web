import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LoadScreen from './LoadScreen';
import Compressor from 'compressorjs';

const Juego = () => {
    const identifierCookie = Cookies.get('userId');
    const newapiUrl = "https://jardinsancayetano.free.nf/API/";
    const [recarga, setRecarga] = useState(0);
    const [file, setFile] = useState(null);
    const [cords, setCords] = useState([]);
    const [pistas, setPistas] = useState([]);
    const [position, setPosition] = useState('');
    const [total, setTotal] = useState('');
    const [mixedOptions, setMixedOptions] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [final, setFinal] = useState(false);
    const [finalLoad, setFinalLoad] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(null);
    const [collage, setCollage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const fotoForm = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        Axios.get(newapiUrl+"Juego/comprobarCamino.php", {
            params: {userId: identifierCookie}
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
        Axios.get(newapiUrl+"Cordenadas/obtenerTotalCordenadas.php")
        .then((result) =>{
            setTotal(result.data.total);
        })
        .catch((error) => {
            console.error("Hubo un error al jugar.", error);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        Axios.get(newapiUrl + "Juego/obtenerCamino.php", {
            params: { userId: identifierCookie }
        }).then((result) => {
            if (result.data) {
                const cordsData = result.data.cords || [];
                const pistasData = result.data.pistas || [];
                const positionData = result.data.position.position || '';
                setCords(cordsData);
                setPistas(pistasData);
                setPosition(positionData);
                if (cordsData.length > 0) {
                    const mixed = cordsData.flatMap(cord => [
                        { text: cord.cords_titulo, isCorrect: true },
                        { text: cord.cords_fake1, isCorrect: false },
                        { text: cord.cords_fake2, isCorrect: false }
                    ]).sort(() => Math.random() - 0.5);

                    setMixedOptions(mixed);
                    setShowForm(false);
                    setButtonsDisabled(false);
                } else {
                    setCollage(result.data.collage);
                }
            } else {
                console.error("Los datos de la API no están definidos.");
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((error) => {
            console.error("Hubo un error al jugar.", error);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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
            if (selectedFile.type.startsWith('image/')) {
                new Compressor(selectedFile, {
                    quality: 0.6,
                    success(compressedFile) {
                        setFile(compressedFile);
                    },
                    error(err) {
                        console.error(err.message);
                    },
                });
            } else {
                alert('Por favor, selecciona un archivo de imagen.');
            }
        }
    };

    const handleClick = (index, isCorrect) => {
        if (isCorrect) {
            setShowForm(true);
            setButtonsDisabled(true); // Deshabilita los botones si la opción es correcta
        }
        setClickedButtons(prev => [...prev, index]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('user', identifierCookie);
            formData.append('ruta', 1);
            formData.append('file', file);
            formData.append('cord', cords[0].cords_id);

            setLoading(true);
            Axios.post(newapiUrl + "Juego/avanzarJuego.php", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((result) => {
                if (result) {
                    setClickedButtons([]);
                    setRecarga(recarga + 1);
                    setFile(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }).catch((error) => {
                console.error("Hubo un error al avanzar.", error);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
        }
    };

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

    useEffect(() => {
        if (pistas.length === imagesLoaded || finalLoad) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [imagesLoaded, pistas.length, finalLoad]);


    if (loading) {
        return <LoadScreen />;
    }

    return (
        <div>
            {final ? (
                <div>
                {collage && (
                    <div>
                    <img
                        className="w-96 h-96"
                        src={`data:image/png;base64,${collage}`}
                        alt="Collage final generado"
                        onLoad={() => setFinalLoad(true)}
                    />
                    <button
                        className="w-40 text-white bg-green-500 rounded-full p-2 my-3"
                        onClick={downloadCollage}
                        aria-label="Descargar el collage generado"
                    >
                        Descargar Collage
                    </button>
                    </div>
                )}
                </div>
            ) : (
                <div>
                <h3 className="mb-5" aria-live="polite">
                    Punto {position}/{total}
                </h3>

                {pistas.map((pista) => (
                    <div className="w-96 h-96 overflow-hidden mb-8" key={pista.pistas_id}>
                    <img
                        className="w-full h-full object-contain"
                        src={pista.pistas_img}
                        alt={`Imagen de la pista: ${pista.pistas_desc}`}
                        onLoad={() => setImagesLoaded((prev) => prev + 1)}
                    />
                    <p>{pista.pistas_desc}</p>
                    </div>
                ))}

                <div className="grid lg:flex" role="group" aria-label="Opciones de respuesta">
                    {mixedOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index, option.isCorrect)}
                        disabled={buttonsDisabled}
                        className={`m-2 p-2 rounded ${clickedButtons.includes(index) ? (option.isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-300'}`}
                        aria-pressed={clickedButtons.includes(index)}
                        aria-label={`Opción: ${option.text}, ${option.isCorrect ? 'Correcta' : 'Incorrecta'}`}
                    >
                        {option.text}
                    </button>
                    ))}
                </div>

                {showForm && (
                    <form
                    ref={fotoForm}
                    className="flex flex-col items-center w-full max-w-sm mx-auto p-4"
                    onSubmit={handleSubmit}
                    aria-label="Formulario para subir foto"
                    >
                    <label htmlFor="uploadFoto" className="sr-only">
                        Subir Foto
                    </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        name="foto"
                        id="uploadFoto"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="w-full p-2 mb-4 border rounded-md"
                        aria-describedby="uploadHelp"
                    />
                    <small id="uploadHelp" className="text-gray-500">
                        Acepta formatos PNG y JPEG
                    </small>
                    <button
                        className="w-full text-white bg-green-500 rounded-full p-2 mt-4"
                        type="submit"
                        aria-label="Subir la foto seleccionada"
                    >
                        Subir Foto
                    </button>
                    </form>
                )}
                </div>
            )}
        </div>
    );
};

export default Juego;