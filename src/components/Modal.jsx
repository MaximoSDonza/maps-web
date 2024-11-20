import React, { useState, useRef, useEffect } from "react";

const Modal = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpia el efecto al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="flex items-center justify-center">
      {/* Botón para abrir el modal */}
      <button
        className="mt-2 border-2 text-green-700 p-2 rounded-full border-green-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleModal}
        aria-label="Abrir el modal"
      >
        ¿Cómo se juega?
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="relative w-11/12 max-w-lg p-6 bg-white rounded-lg shadow-lg"
          >
            {/* Botón para cerrar el modal */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleModal}
              aria-label="Cerrar el modal"
            >
              ✖
            </button>

            {/* Contenido dinámico del modal */}
            <div className="text-gray-600 text-lg leading-relaxed">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
