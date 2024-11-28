import React, { useEffect, useState } from 'react'

import axios from 'axios'

import NavBar from './Navbar';

const Departaments = () => {

    const [listDep, setListDep] = useState([]);
    
    useEffect(() =>{
        gettDepartament();
    }, []);

    const token = localStorage.getItem('authToken');

    const gettDepartament = () => {
        axios.get('http://localhost:4000/api/v1/department', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListDep(response.data.departaments)
            console.log(listDep);
            
        }).catch((err) => {
            alert(err.message);
        })
    }
    

  return (
  <>
    <NavBar />
    <h2>Departamentos</h2>
    <button>
        Agregar
    </button>

    <div className='contenedorDep'>
        
    </div>
  </>
  )
}

export default Departaments;
