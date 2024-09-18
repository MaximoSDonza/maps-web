import React from 'react'
import sancayetano from '../assets/sancayetanoo.png';
import t2 from '../assets/tecnica2.png';

const Footer = () => {
  return (
    <footer className='flex justify-around'>
        <img className="mb-2 w-24 h-24" src={sancayetano} alt="LogoJardin" />
        <img className="mb-2 w-24 h-24" src={t2} alt="LogoTecnica2" />
    </footer>
  )
}

export default Footer
