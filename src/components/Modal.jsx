
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const Modal = ({
    isOpen, 
    closeModal, 
    tokenOrg, 
    refreshOrg,
    organizationEdit
}) => {
    const [name, setName] = useState('');
    const [typeOrg, setTypeOrg] = useState('');
    const [codeOrg, setCodeOrg] = useState('');
    const [deleteOrg, setDeleteOrg] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        codigo: ''
    });

    useEffect(() =>{
        if(organizationEdit){
            setFormData({
                nombre: organizationEdit.nombre || '',
                tipo: organizationEdit.tipo || '',
                codigo: organizationEdit.codigo || '',
                liminado: deleteOrg
            });
        }else {
            setFormData({
                nombre: '',
                tipo: '',
                codigo: '',
                eliminado: deleteOrg
            })
        }
    }, [organizationEdit])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(organizationEdit){
            axios.put(`http://localhost:4000/api/v1/organization/update/${organizationEdit._id}`, 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenOrg}`,
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                toast.success('Organización actualizada correctamente');
                closeModal();
                refreshOrg();
            }).catch((err) => {
                handleError(err);
            });
        } else{
            axios.post('http://localhost:4000/api/v1/organization/add', 
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenOrg}`,
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                toast.success('Organización agregada correctamente');
                closeModal();
                refreshOrg();
            }).catch((err) => {
                handleError(err);
            });
        }
    }

    const handleError = (err) => {
        if(err.response){
            toast.error(err.response.data.message || 'Error al procesar la organización');
        } else if (err.request){
            toast.error('No se pudo conectar con el servidor');
            console.log('Error al procesar la solicitud');   
        } else {
            toast.error('Error al procesar la solicitud');
        }
    };

    if(!isOpen) return null;
    


  return (
    <div>
        <h3>{organizationEdit ? 'Editar Organización' : 'Agregar Organización'}</h3>
        <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Type </label>
                        <input
                            type="text"
                            id="type"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="code">Code </label>
                        <input
                            type="text"
                            id="code"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        {organizationEdit ? 'Actualizar' : 'Agregar'}
                    </button>
            </form>

        <button onClick={closeModal}>Cancelar</button>
    </div>
  )
}

export default Modal;
