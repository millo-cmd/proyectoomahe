import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './Navbar';
import ModalDep from './ModalDep'
import '../styles/Departaments.css';

const Departaments = () => {

    const [listDep, setListDep] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [departamentEdit, setDepartamentEdit] = useState(null);
    const [ deleteDep, setDeleteDep ] = useState(false);

    const token = localStorage.getItem('authToken');

    const handleEditDepartament = (departaments) => {
        setDepartamentEdit(departaments);
        setShowForm(true);
    }

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

    const deleteDepartament = (depId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este deparamento?');
        if(!confirmDelete){
            return;
        }

        axios.delete(`http://localhost:4000/api/v1/department/delete/${depId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                if(response.status === 200){
                    gettDepartament();
                    setDeleteDep(true);
                    toast.success('Departamento eliminado correctamente'); 
                }
            }).catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            toast.error('Departamento no encontrado');
                            break;
                        case 403:
                            toast.error('No tienes permisos para eliminar este Departamento');
                            break;
                        default:
                            toast.error('Error al eliminar el Departamento');
                    }
                } else if (err.request) {
                    toast.error('No se pudo conectar con el servidor');
                } else {
                    // Algo salió mal al configurar la solicitud
                    toast.error('Error inesperado al intentar eliminar');
                }
                
                // Loguear el error para depuración
                console.error('Error detallado:', err);
            })

    }
    
  return (
  <>
    <NavBar />
    <h2>Departamentos</h2>
    <button onClick={() => {
        setDepartamentEdit(null);
        setShowForm(true);
    }}>
        Agregar
    </button>

    <ModalDep 
        isOpen={showForm}
        closeModal={() => setShowForm(false) }
        tokenDep={token}
        refreshDep={gettDepartament}
        departamentEdit={departamentEdit}
        deleteDep={deleteDep}
    />

    <div className='contenedorDep'>
        {
            listDep.map((departaments) => (
                <div key={departaments._id} className='card'>
                    <h3>{departaments.nombre}</h3>
                    <p>{departaments.codigo}</p>
                    <div className='bbuttonDiv'>
                        <button onClick={()=> deleteDepartament(departaments._id)}>Eliminar</button>
                        <button onClick={()=> handleEditDepartament(departaments) }>Editar</button>
                    </div>
                </div>
            ))
        }
    </div>
  </>
  )
}

export default Departaments;
