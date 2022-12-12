import React from 'react'

function Info_general(props) {
  return (
    <>
    <div className="card-info">
    <h4 className='text-center'>Información general</h4>
    <table className="table ">
    <tbody key={'1'}>
      <tr>
        <td className='fs-6 fw-bold text-start'>Empresa</td>
        <td><strong className='fs-6 d-flex'>{`${props.company}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Proveedor</td>
        <td><strong className='fs-6 d-flex'>{`${props.provider}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Contacto</td>
        <td><strong className='fs-6 d-flex'>{`${props.contact_provider}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Nombre de servidor</td>
        <td><strong className='fs-6 text-start d-flex'>{`${props.name}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Descripción</td>
        <td><strong className='fs-6 text-start d-flex'>{`${props.description}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Sistema operativo</td>
        <td><strong className='fs-6 text-start d-flex'>{`${props.so}`}</strong></td>
      </tr>
      <tr>
        <td className='fs-6 fw-bold text-start'>Notas</td>
        <td><strong className='fs-6 text-start d-flex'>{props.notes ? `${props.notes}` : 'No hay notas registradas'}</strong></td>
      </tr>
    </tbody>
    <div className='mb-3'></div>
  </table>
  </div>
  </>
  )
}

export default Info_general