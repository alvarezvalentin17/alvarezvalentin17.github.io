import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'

function Modals({btn_new,function_new,btn_title2,class_btn,function_btn,modal_title,body,function_btn1,textBtnClose,textBtnSave, allServers},) {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
      <>
      {btn_new ? <div className='d-flex align-items-end flex-column'>
        <p className='btn mt-auto mb-auto' variant="primary" onClick={()=>{handleShow();function_new ? function_new() : handleShow()}}>
          {btn_new}
        </p>
        <p>{allServers}</p>
      </div> : 
      <p className={`${class_btn}`} onClick={()=>{handleShow();function_btn ? function_btn() : handleShow()}} >{btn_title2}</p>}
      
      
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeVariant='white'>
            <Modal.Title className='bg '><p className='text'>{modal_title}</p></Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            {textBtnClose ?             <Button variant="secondary" onClick={handleClose}>
              {textBtnClose}
            </Button> : null}

            <Button variant="primary" onClick={()=> {handleClose(); function_btn1 ? function_btn1() : handleClose();
              }}>
              {textBtnSave}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default Modals