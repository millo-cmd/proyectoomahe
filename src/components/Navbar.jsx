import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from 'jwt-decode'

import '../styles/navbar.css'
 

const NavBar = () => {
    const [userRol, setUserRol] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(token){
            try{
                const data = jwtDecode(token);
                const rol = data.rol;
                setUserRol(rol);          
                
            }catch(e){
                console.log('error al decodificar el token: ', e.message);
            }
        }else{
            console.log('No se encontró un token en el almacenamiento local');
        }
    }, []); // Añade un array de dependencias vacío

    const LogOut = () => {
        localStorage.clear();
        Navigate('/login');
    }

    return (
        <div className="divBar">
            <ul>
                {userRol === 'Administrador App' && (
                    <div>
                        <Link to='/organization'>Organization</Link>
                    </div>
                )}

                {userRol === 'Administrador Org' && (
                    <div>
                        <Link to='/departaments'>Departaments</Link>
                    </div>
                )}
            </ul>
            <button onClick={() => LogOut() }>LogOut</button>
        </div>
    );
};

export default NavBar;