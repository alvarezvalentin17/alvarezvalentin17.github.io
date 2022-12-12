import React, {useState} from 'react'
import Modals from '../../common/modal'
import { updateDoc, doc } from 'firebase/firestore'
import db from '../../../services/FirebaseConfig';
import Swal from 'sweetalert2';

function Edit(props) {
  const [company, setCompany] = useState();
  const [provider, setProvider] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [so, setSo] = useState();
  const [notes, setNotes] = useState();


  const saveInputs = () => {
    let company = document.getElementById('company').value;
    let provider = document.getElementById('provider').value;
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let so = document.getElementById('so').value;
    let notes = document.getElementById('notes').value;

    setCompany(company);
    setProvider(provider);
    setName(name);
    setDescription(description);
    setSo(so)
    setNotes(notes)
  }


  const update = async ()=> {
    const docRef = doc(db, "servers", props.id)
     await updateDoc(docRef,{
          company: company,
          provider: provider,
          name: name,
          description: description,
          so: so,
          notes:notes,
                })
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'El item fue actualizado con exito!',
                  showConfirmButton: false,
                  timer: 1500
                })
  }
  const loadInputs = ()=> {
    setTimeout(()=>{
        document.getElementById('company').value = props.company1;
        document.getElementById('provider').value = props.provider1;
        document.getElementById('name').value = props.name1;
        document.getElementById('description').value = props.description1;
        document.getElementById('so').value = props.so1;
        document.getElementById('notes').value = props.notes1;
    },1)
  }
  return (
    <Modals 
      btn_title2={<span className="btn material-symbols-outlined">edit</span>}
      class_btn='inline'
      function_btn={loadInputs}
      modal_title='Editar servidor'
      body={
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
            <td className='fs-6 fw-bold'>Nombre</td>
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
            <td className='fs-6 fw-bold'>Notes</td>
            <td><textarea onChange={saveInputs} id='notes' className='form-control' type="text" /></td>
          </tr>
        </tbody>
      </table>
      }
      function_btn1={update}
      textBtnClose='Cerrar'
      textBtnSave='Guardar'
    />
  )
}

export default Edit