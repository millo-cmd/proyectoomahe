import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from 'jwt-decode'

const ModalDep = ({ 
    isOpen, 
    closeModal, 
    tokenDep, 
    refreshDep, 
    departamentEdit,
    deleteDep
}) => {

    
    const[formData, setFormData] = useState({
        nombre: '',
        eliminado: deleteDep,
        codigo: ''
    });

    useEffect(() => {
        if(departamentEdit){
            setFormData({
                nombre: departamentEdit.nombre || '',
                eliminado: deleteDep,
                codigo: departamentEdit.codigo || ''
                
            });
        }else {
            setFormData({
                nombre: '',
                eliminado: deleteDep,
                codigo: ''
            })
        }
        console.log(jwtDecode(tokenDep));
        
    }, [departamentEdit])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(departamentEdit){
            axios.put(`http://localhost:4000/api/v1/department/update/${tokenDep}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenDep}`,
                        'Content-Type': 'application/json'
                    }
                }
            ).then((reponse) => {
                toast.success('Departamento actualizado correctamente');
                closeModal();
                refreshDep();
            }).catch((err) => {
                handleError(err);
            })
        }else{
            axios.post('http://localhost:4000/api/v1/department/add',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenDep}`,
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                toast.success('Departamento agregado correctamente');
                closeModal();
                refreshDep();
            }).catch((err) =>{
                handleError(err);
            });
        } 
    }

    const handleError = (err) => {
        if(err.response){
            toast.error(err.response.data.message || 'Error al procesar el departamento');
        } else if (err.request){
            toast.error('No se pudo conectar con el servidor');
            console.log('Error al procesar la solicitud');   
        } else {
            toast.error('Error al procesar la solicitud');
        }
    }

    if(!isOpen) return null;

  return (
    <div>
        <h3>{departamentEdit ? 'Editar Departamento' : 'Agregar Departamento'}</h3>
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
                        {departamentEdit ? 'Actualizar' : 'Agregar'}
                    </button>
        </form>
        <button onClick={closeModal}>Cancelar</button>
    </div>
  )
}

export default ModalDep;