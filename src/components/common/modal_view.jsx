import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import './modal.css'

function Modal_view(props) {

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    
    function handleShow(values) {
      setFullscreen(values);
      setShow(true);
    }

  return (
    <>
    {values.map((v, idx) => (
      <p className=' btn inline' key={idx}  onClick={() => handleShow(v)}>
        <span onClick={props.getDocuments} className="material-symbols-outlined">visibility</span>
        {typeof v === 'string' && `below ${v.split('-')[0]}`}
      </p>
    ))}
    <Modal  show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title >{props.title_modal}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bk'>{props.body}</Modal.Body>
    </Modal>
  </>
  )
}

export default Modal_view