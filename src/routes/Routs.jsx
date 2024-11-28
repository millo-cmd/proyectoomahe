import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

import Login from '../components/Login';
import HomePage from '../components/HomePage';
import Organization from '../components/Organization';
import Departaments from '../components/Departaments';




  const AdminAppRoute = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState(false); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if(decoded.rol === 'Administrador App'){
            setAuthorized(true);
          }
        } catch (error) {
          console.log('Error al validar el token', error);
          setAuthorized(false)
        }
      }

      setLoading(false);
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" replace />
}

const AdminOrgRoute = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if(decoded.rol === 'Administrador Org'){
            setAuthorized(true);
        }
      } catch (error) {
        console.log('error al validar el token', error);
        setAuthorized(false);
      }
    }

    setLoading(false);
  }, []);
  if(loading){
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}
  
export default function Root() {
  const [userRole, setUserRole] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const token = localStorage.getItem('authToken');
    
    if(token){
      try {
        const decode = jwtDecode(token);
        setUserRole(decode.rol)
      } catch (error) {
        console.log('token invalido', error);
        setUserRole(null);
      }
    }
    
    setLoading(false);
  }, []);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomePage />} />

        {/* Ruta protegida de Administrador App */}
        <Route 
          path='/organization' 
          element={
            <AdminAppRoute>
              <Organization  />
            </AdminAppRoute>
          } 
        />

        {/* Ruta protegida de Administador Org */}
        <Route 
          path='/departaments'
          element={
            <AdminOrgRoute>
              <Departaments />
            </AdminOrgRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route 
          path='*' 
          element={<Navigate to='/login' replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
