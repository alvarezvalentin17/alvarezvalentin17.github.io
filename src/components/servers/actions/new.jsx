import React from 'react'
import { useState } from 'react';
import Modals from '../../common/modal'
import { addDoc, collection } from 'firebase/firestore';
import db from '../../../services/FirebaseConfig'
import Swal from 'sweetalert2'

function New() {
  const [company, setCompany] = useState();
  const [provider, setProvider] = useState();
  const [contact_provider, setContactProvider] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [so, setSo] = useState();
  const [notes, setNotes] = useState();


  const saveInputs = () => {
    let company = document.getElementById('company').value;
    let provider = document.getElementById('provider').value;
    let contact_provider = document.getElementById('contact_provider').value;
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let so = document.getElementById('so').value;
    let notes = document.getElementById('notes').value;

    setCompany(company);
    setProvider(provider);
    setName(name);
    setDescription(description);
    setSo(so);
    setNotes(notes);
    setContactProvider(contact_provider)
  }

  const saveData = async () => {
    if(!company || !provider || !contact_provider || !name || !description || !so ){
      Swal.fire(
        'Debes cargar todos los datos',
      )
      
    } else {
    await addDoc(collection(db, "servers"), {
      company: company,
      provider: provider,
      contact_provider: contact_provider,
      name: name,
      description: description,
      so: so,
      notes: notes,
    });
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El item fue creado con exito!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
    <Modals 
      btn_new={<span className="material-symbols-outlined">add_circle</span>}
      modal_title={'Crear nuevo servidor'}
      body={
        <>  
        <table className="table">
          <tbody key={'1'}>
            <tr>
              <td className='fs-6 fw-bold'>Empresa</td>
              <td><input onChange={saveInputs} id='company' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Proveedor</td>
              <td><input onChange={saveInputs} id='provider' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Contacto</td>
              <td><input onChange={saveInputs} id='contact_provider' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Nombre de servidor</td>
              <td><input onChange={saveInputs} id='name' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Descripción</td>
              <td><input onChange={saveInputs} id='description' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Sistema operativo</td>
              <td><input onChange={saveInputs} id='so' className='form-control' type="text" /></td>
            </tr>
            <tr>
              <td className='fs-6 fw-bold'>Notas</td>
              <td><textarea onChange={saveInputs} id='notes' className='form-control' type="text" /></td>
            </tr>
          </tbody>
        </table>
        
        </>
    
  }
  function_btn1={saveData}
  textBtnClose='Cerrar'
  textBtnSave='Guardar'
    />
    
    </>

  )
}

export default New
