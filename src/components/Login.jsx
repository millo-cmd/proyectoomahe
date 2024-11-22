import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = ({ setIsAuthenticated }) => {
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
            body: JSON.stringify({ email: email, pass: pass })
        })
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token); // Guarda el token en localStorage
                setIsAuthenticated(true);  // Llama a setIsAuthenticated si lo necesitas
                navigate('/');  // Redirige a la ruta principal (privada)
            } else {
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

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
            </div>
        </section>
    );
};

export default Login;
