import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import E_cuenta from './pages/recover/E_cuenta.jsx';
import C_correo from './pages/recover/C_correo.jsx';
import C_codigo from './pages/recover/C_codigo.jsx';
import N_contraseña from './pages/recover/N_contraseña.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-cuenta" element={<E_cuenta />} />
        <Route path="/confirmar-correo" element={<C_correo />} />
        <Route path="/confirmar-codigo" element={<C_codigo />} />
        <Route path="/nueva-contraseña" element={<N_contraseña />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
