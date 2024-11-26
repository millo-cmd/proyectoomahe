import React, { useState, useEffect } from 'react';

import axios from 'axios';

import NavBar from './Navbar';

import '../styles/organization.css'

const Organization = () => {

    const [listOrg, setListOrg] = useState([]);

    const token = localStorage.getItem('authToken');

    useState(() => {
        axios.get('http://localhost:4000/api/v1/organization', {
            headers: {
                'Authorization': `Bearer ${token}`
                }
                })
                .then((response) => {
                    setListOrg(response.data.organizations);
                    
                }).catch((err) => {
                    alert(err.message);
                })
    }, [setListOrg]);

    

    return(
        <>
            <NavBar />
            <h2>Organizaciones</h2>
            <div className='contenedorCard'>
                {
                    listOrg.map((organization, index) => (
                        <div key={index} className='card'>
                            <h3>{organization.nombre}</h3>
                            <p>{organization.codigo}</p>
                            <div className='bbuttonDiv'>
                                <button>Eliminar</button>
                                <button>Editar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default Organization;