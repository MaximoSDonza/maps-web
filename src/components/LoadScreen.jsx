import React from 'react'
import carga from '../assets/cargar.gif';
const LoadScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <img src={carga} className="h-80 w-80" alt="carga" />
            {/* <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-green-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-green-500 animate-spin"></div> */}
        </div>
    </div>
  )
}

export default LoadScreen