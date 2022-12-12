import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import New from '../servers/actions/new';
import Edit from '../servers/actions/edit';
import Delete from '../common/actions/delete'
import View from '../view/view';
import './servers.css'

function Servers(props) {

  const i = props.clients;
  const allItems = props.items

  const [ search, setSearch ] = useState("");
  const [finder, setFinder] = useState('')

    const result = () => {
      if(!search){
      return i;
    } else if(finder == 'description'){
      return allItems.filter((e)=> e.description.toLowerCase().includes(search.toLocaleLowerCase()),(e)=>e.description.toLowerCase().includes(search.toLocaleLowerCase()));
      
    } else if(finder == 'provider') {
      return allItems.filter((e)=> e.provider.toLowerCase().includes(search.toLocaleLowerCase()),(e)=>e.description.toLowerCase().includes(search.toLocaleLowerCase()));

    }else{
      return allItems.filter((e)=> e.name.toLowerCase().includes(search.toLocaleLowerCase()));
    }
  }


    const results = result();
    
    
    const searcher = (e) => {
      setSearch(e.target.value)   
    }


    return (
      <> 
          <Container> 
            <div className="container">
            <New /> 
            <div className="container">

            <select  value={ finder } onChange={ (event) => setFinder(event.target.value) } className="size-select" >
              <option value="name" >Nombre</option>
              <option value="provider">Proveedor</option>
              <option value="description">Descripcion</option>
            </select>

          <input className='container form-control w-50' value={search} onChange={searcher}  type="text" placeholder='Buscar por nombre de servidor'/>
            </div>
            
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Empresa</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Sistema Operativo</th>
                </tr>
              </thead>
              {results.map((e)=>(
                <tbody key={e.id}>
                <tr>
                  <td>{e.company}</td>
                  <td>{e.provider}</td>
                  <td>{e.name}</td>
                  <td>{e.so}</td>
                  <td>
                    <View 
                      id={e.id}
                      company={e.company}
                      provider={e.provider}
                      contact_provider={e.contact_provider}
                      name={e.name}
                      description={e.description}
                      so = {e.so}
                      notes={e.notes}
                      
                      />
                    
                    <Edit
                        id={e.id}
                        company1={e.company}
                        provider1={e.provider}
                        name1={e.name}
                        description1={e.description}
                        so1 = {e.so}
                        notes1={e.notes}
                        />
                        
                    <Delete  id={e.id} name={e.name} collection={'servers'} />
                    </td>
                </tr>
              </tbody>
              ))
            }
            </table>
            {/* <Table className="" responsive='md' size='md'>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Proveedor</th>
                  <th>Nombre</th>
                  <th>Sistema operativo</th>

                </tr>
              </thead>
              {results.map((e)=>(
                <tbody key={e.id}>
                <tr>
                  <td>{e.company}</td>
                  <td>{e.provider}</td>
                  <td>{e.name}</td>
                  <td>{e.so}</td>
                  <td>
                    <View 
                      id={e.id}
                      company={e.company}
                      provider={e.provider}
                      contact_provider={e.contact_provider}
                      name={e.name}
                      description={e.description}
                      so = {e.so}
                      notes={e.notes}
                      
                      />
                    
                    <Edit
                        id={e.id}
                        company1={e.company}
                        provider1={e.provider}
                        name1={e.name}
                        description1={e.description}
                        so1 = {e.so}
                        notes1={e.notes}
                        />
                        
                    <Delete  id={e.id} name={e.name} collection={'servers'} />
                    </td>
                </tr>
              </tbody>
              ))
            }
            </Table> */}
            <nav className=''>
              <ul className="pagination center">
                <li className="page-item"><a className="page-link me-2 btn" onClick={props.prevHandler}>Anterior</a></li>
                <li className="page-item"><a className="page-link btn">{props.currentPage}</a></li>
                <li className="page-item"><a className="page-link ms-2 btn" onClick={props.nextHandler}>Siguiente</a></li>
              </ul>
            </nav>

            {/* <div className='size_select position'>
              <select onChange={props.viewServers} id='selectViewServers' className="form-select ms-4" aria-label="Default select example">
              <option value= {10}>10</option>
              <option value= {30}>30</option>
              <option value= {50}>50</option>
              <option value= {100}>100</option>
              <option value= {1000}>Todos</option>
              </select>
            </div> */}

            </Container>
    </>
  )
}

export default Servers


