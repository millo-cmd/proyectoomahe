import '../styles/login.css';

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el recargado de la página
        loginAction(email, pass);
    };

    const loginAction = (email, pass) => {
        fetch('http://localhost:4000/api/v1/employee/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, pass })
        })
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(response => {
            if(response.success) {
                setIsAuthenticated(true);
                navigate('/organization');
                
            }else{
                alert('Credenciales incorrectas');
            }      
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }


    return (
        <section className="login-container">
            <h2>Iniciar Sesión</h2>
            <div className='columForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña </label>
                        <input
                            type="password"
                            id="password"
                            value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
                <h3>  </h3>
            </div>
        </section>
    );
};

export default Login;