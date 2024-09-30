import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Registrar from "./routes/Registrar.jsx";
import Admin from "./routes/Admin.jsx";
import Home from "./routes/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadScreen from './components/LoadScreen';
import { useState, useEffect } from "react";

function App() {

  return (
    <div className="w-full h-full">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Registrar />} />
        <Route path="/*" element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;