import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import db from '../../../services/FirebaseConfig'
import Swal from 'sweetalert2'

function Delete(props) {
  return (
    <span className='material-symbols-outlined btn inline' onClick={()=>{
      Swal.fire({
        title: `¿Desea borrar "${props.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Borrar'
      }).then(async (result) => {
        
        if (result.isConfirmed) {
          try {
            await deleteDoc(doc(db, props.collection, props.id));
          } catch (error) {
            console.log(error)
          }

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El item fue borrado con exito!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }}>delete</span>
  )
}

export default Delete