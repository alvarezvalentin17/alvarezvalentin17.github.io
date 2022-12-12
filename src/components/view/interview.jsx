import React from 'react'
import Modals from '../common/modal'
import Swal from 'sweetalert2'
import { addDoc, collection } from "firebase/firestore";
import db from '../../services/FirebaseConfig'
import { Table } from 'react-bootstrap'
import { useState } from 'react'
import Delete from '../common//actions/delete'
import './view.css'

// Recibe los datos de componente View.
function Interview(props) {
    const date = new Date().toLocaleDateString('es-ar');
    const items = props.items;
    const render = items.length > 0 ? true : false;

    const saveInput = async ()=> {
        const task = document.getElementById('task').value;
        const issue = document.getElementById('issue').value;
        const ticket = document.getElementById('ticket').value;
    
    
        if(!issue) {
          Swal.fire(
            'Debes ingresar un asunto!',
            '',
            'warning'
          )
        } else if(!task){
          Swal.fire(
            'Debes escribir los detalles sobre la tarea',
            '',
            'warning'
          )
        }
        else {
            await addDoc(collection(db, "tasks"), {
                ids:props.id,
                server_name: props.name,
                task: task,
                ticket: ticket,
                date: date,
                issue: issue
            });
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El item fue agregado con exito!',
              showConfirmButton: false,
              timer: 1500
            })
        }
      }


  return (
    <div className='card-info border1'>
        
    {/* Modal load tasks start */}
    <Modals 
      btn_new={<span className="material-symbols-outlined">add_circle</span>}
      modal_title={'Generar intervencion'}
      body={
        <>
        <p>Detalle la tarea sobre el servidor: <strong>{`${props.name}`}</strong></p>
        <p>Fecha: <strong>{date}</strong></p>
        <input className='form-control mb-3' placeholder='Link de Ticket asociado' type="text" id="ticket" />
        <input className='form-control mb-3' placeholder='Asunto' type="text" id="issue" />
        <textarea className='border form-control' placeholder='Escribe aqui las tareas realizadas...' name="" id="task" cols="60" rows="10"></textarea>
        
        </>
      }
      function_btn1={()=>{saveInput()}}
      textBtnClose='Cerrar'
      textBtnSave={'Guardar'}
    />
      {/* Modal load tasks end */}

    <h4 className='text-center'>Intervenciones</h4>
    <Table >
      <thead>
          <tr>
            <th>Fecha</th>
            <th>Asunto</th>
          </tr>
      </thead>
      

      {render ? items.map((e)=>(
      <tbody key={e.id}>
          <tr>
            <td>{e.date}</td>
            <td>{e.issue}</td>
            <td>
                <Modals 
                    btn_title2={<span className="btn material-symbols-outlined inline">visibility</span>}
                    modal_title={`${e.server_name}`}
                    class_btn='inline'
                    body={
                      <>
                        <p><strong>Asunto:</strong> {e.issue}</p>
                        <p><strong>Fecha:</strong>  {e.date}</p>
                        <p><strong>Ticket:</strong>  {e.ticket ? e.ticket : <p>No hay ticket asociado</p>}</p>
                        <p><strong>Tarea realizada:</strong> {e.task}</p>
                      </>
                    }
                    textBtnSave='OK!'
                    
            /> 
            <Delete id={e.id} name={e.issue} collection={'tasks'}/></td>
          </tr>

        </tbody>  )
        
        ): <tbody><tr><td>No hay datos</td><td>No hay datos</td></tr></tbody>}
      <td className='center_interv'>
      </td>
    </Table>
      <ul className="pagination mt-3 center_interv ">
        <li className="page-item"><p className="page-link me-2 btn" onClick={props.prevHandler}>Anterior</p></li>
        <li className="page-item"><p className="page-link btn">{props.currentPage}</p></li>
        <li className="page-item"><p className="page-link ms-2 btn" onClick={props.nextHandler}>Siguiente</p></li>
      </ul>
      
    </div>
  )
}

export default Interview