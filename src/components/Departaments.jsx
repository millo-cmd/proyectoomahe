import React, { useEffect, useState } from 'react'

import axios from 'axios'

import NavBar from './Navbar';
import '../styles/Departaments.css';

const Departaments = () => {

    const [listDep, setListDep] = useState([]);

    const token = localStorage.getItem('authToken');

    const gettDepartament = () => {
        axios.get('http://localhost:4000/api/v1/department', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListDep(response.data.departments)
        }).catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() =>{
        gettDepartament();
    }, []);
    
  return (
  <>
    <NavBar />
    <h2>Departamentos</h2>
    <button>
        Agregar
    </button>

    <div className='contenedorDep'>
        {
            listDep.map((departaments) => (
                <div key={departaments._id} className='card'>
                    <h3>{departaments.nombre}</h3>
                    <p>{departaments.codigo}</p>
                </div>
            ))
        }
    </div>
  </>
  )
}

export default Departaments;
