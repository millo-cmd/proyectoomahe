import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './Navbar';
import Modal from './Modal';

import '../styles/organization.css'

const Organization = () => {

    const [listOrg, setListOrg] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [organizationEdit, setOrganizationEdit] = useState(null);

    const token = localStorage.getItem('authToken');

    const handleEditOrganization = (organization) => {
        setOrganizationEdit(organization)
        setShowForm(true);
    }


    //Funcion para traer datos de la API 
    const gettOrganization = () => {
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
    }

    //useEfect para que solo haga la peticion cuando la pagina cargue
    useEffect(() => {
        gettOrganization();
    }, []);

    //Funcion para eliminar los datos
    const deleteOrganization = (orgId) => {

            const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta organización?');
            if (!confirmDelete) {
                return;
            }

            axios.delete(`http://localhost:4000/api/v1/organization/delete/${orgId}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        gettOrganization();
                        
                        // Notificación de éxito más amigable
                        toast.success('Organización eliminada correctamente'); 
                    }
                }).catch ((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            toast.error('Organización no encontrada');
                            break;
                        case 403:
                            toast.error('No tienes permisos para eliminar esta organización');
                            break;
                        default:
                            toast.error('Error al eliminar la organización');
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
    

    return(
        <>
            <NavBar />
            <h2>Organizaciones</h2>
            <button onClick={() =>{
                setOrganizationEdit(null);
                setShowForm(true);
            }}>Agregar</button>

            <Modal 
            isOpen={showForm} 
            closeModal={() => setShowForm(false)} 
            tokenOrg={token}
            refreshOrg={gettOrganization}
            organizationEdit={organizationEdit}
            />

            <div className='contenedorCard'>
                {
                    listOrg.map((organization) => (
                        <div key={organization._id} className='card'>
                            <h3>{organization.nombre}</h3>
                            <p>{organization.tipo}</p>
                            <p>{organization.codigo}</p>
                            <div className='bbuttonDiv'>
                                <button onClick={()=> deleteOrganization(organization._id)}>Eliminar</button>
                                <button onClick={() => handleEditOrganization(organization) }>Editar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default Organization;