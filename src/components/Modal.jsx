
import React, { useState } from 'react'

import axios from 'axios';

 const Modal = ({isOpen, closeModal, tokenOrg, refreshOrg}) => {
    const [name, setName] = useState('');
    const [typeOrg, setTypeOrg] = useState('');
    const [codeOrg, setCodeOrg] = useState('');
    const [deleteOrg, setDeleteOrg] = useState(false);


    if(!isOpen) return null;
    

    const addAction = (e) => {
        e.preventDefault();
        addOrganization(name, typeOrg, codeOrg, deleteOrg)
    }

    const addOrganization = (name, typeOrg, codeOrg,  deleteOrg) => {
        axios.post('http://localhost:4000/api/v1/organization/add',
            {
                nombre: name, 
                tipo: typeOrg, 
                codigo: codeOrg, 
                eliminado: deleteOrg
            },
            {
            headers: {
                'Authorization': `Bearer ${tokenOrg}`,
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            alert('se agrego correctamente: ')
            setName('');
            setTypeOrg('');
            setCodeOrg('');

            closeModal();
            refreshOrg();

        }).catch((err) => {
            if(err.responce){
                alert(err.responce.data.message || 'error al agregar la organizacion')
            }else if(err.request){
                alert('no se recibio respuesta del servidor');
                console.log(err.request);
                
            } else{
                alert('error al procesar la solicitud')
            }
        });
    }


  return (
    <div>
        <h3>add organization</h3>
        <form onSubmit={addAction}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Type </label>
                        <input
                            type="text"
                            id="type"
                            value={typeOrg}
                            onChange={(e) => setTypeOrg(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="code">Code </label>
                        <input
                            type="text"
                            id="code"
                            value={codeOrg}
                            onChange={(e) => setCodeOrg(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Ingresar</button>
            </form>

        <button onClick={closeModal}>Cancelar</button>
    </div>
  )
}

export default Modal;
