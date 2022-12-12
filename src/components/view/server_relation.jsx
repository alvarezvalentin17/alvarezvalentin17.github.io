import React, {useState} from 'react'
import {Table} from 'react-bootstrap'
import Modals from '../common/modal'
import Swal from 'sweetalert2'
import { addDoc, collection } from "firebase/firestore";
import db from '../../services/FirebaseConfig';
import Delete from '../common/actions/delete';

function Interacts(props) {

    const [pageSize, setPageSize] = useState(15);
    const server_relation = props.relation;
    console.log(server_relation)






    const saveInput = async ()=> {
        const relation_server_with = document.getElementById('relation_server_with').value;
        const description = document.getElementById('description').value;
    
    
        if(!relation_server_with) {
          Swal.fire(
            'Debes ingresar un asunto!',
            '',
            'warning'
          )
        } else if(!description){
          Swal.fire(
            'Debes comentar de que manera se relacionan!',
            '',
            'warning'
          )
        }
        else {
            await addDoc(collection(db, "interacts"), {
                ids:props.id,
                server_name: props.name,
                relation_server_with: relation_server_with,
                description: description
            });
        }
      }
  return (
    <>
      <div className='card-info'>
        {/* Modal load tasks start */}
    <Modals 
      btn_new={<span className="material-symbols-outlined">add_circle</span>}
      modal_title={`Servidores relacionados`}
      body={
        <>
        <p>Detalle la tarea sobre el servidor: <strong>{`${props.name}`}</strong></p>

        <div className="input-group mb-3">
            <span className="input-group-text w-50 fw-bold" id="inputGroup-sizing-default ">{props.name}</span>
            <span className="input-group-text">&rArr;</span>
            <input type="text" id='relation_server_with' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
        </div>

        <textarea className='border form-control' placeholder='¿De que manera estan relacionados?'  id="description" cols="60" rows="10"></textarea>
        
        </>
      }
      function_btn1={()=>{saveInput()}}
      textBtnClose='Cerrar'
      textBtnSave={'Guardar'}
    />
      {/* Modal load tasks end */}
        <h4 className='text-center'>Relacionado con:</h4>

        <Table >
      <thead>
          <tr>
            <th>Fecha</th>
            <th>Asunto</th>
          </tr>
      </thead>
      

      {props.render ? props.relation.map((e)=>(
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
                        <p><strong>Asunto:</strong> {e.relation_server_with}</p>
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
    
    </>
  )
}

export default Interacts