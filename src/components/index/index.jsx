import React, { useState, useEffect } from 'react'
import Menu from '../menu/menu'
import Servers from '../servers/servers'
import db from '../../services/FirebaseConfig'
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";


function Index() {

  const [pageSize, setPageSize] = useState(15);
  const [datosFromApi, setDatosFromApi] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const arr = [...datosFromApi].splice(0, pageSize);

  const allServers = datosFromApi.length;

  const numberPage = ()=> {
      const num_of_page = datosFromApi.length/pageSize;
      return num_of_page 
  }

  numberPage()
  // Esta funcion es parte de la logica de cambio de items a mostrar
  const viewServers = () => {
    const value = document.getElementById('selectViewServers').value; 
    setPageSize(value)
  }

  // Logica para la paginacion
  //This function is responible for load the initial data in the state variable.
  const loadDocuments = () => {
    setItems(arr)
    }
  //useEffect is for the function does not go into an infinit loop.
  useEffect(() => {
      loadDocuments()

      const collections = collection(db, "servers");
      const q = (query(collections, orderBy('name', 'asc')))
      
      const data = onSnapshot(q, (querySnapshot) => {
        const clientsAdd = [];
        querySnapshot.forEach((doc) => {
          clientsAdd.push({id: doc.id,...doc.data()});
        });
        setDatosFromApi([...clientsAdd])
      });
    }, [datosFromApi.length])
    

  
  // Get the data of Firebase.
  
  // Logic button Next
  const nextHandler = () => {
    const allElements = datosFromApi.length;
    const nextPage = currentPage  + 1;
    const firstIndex = nextPage * pageSize;
    if( firstIndex >= allElements) return; 
    const arra = [...datosFromApi].splice(firstIndex, pageSize);
    setItems(arra)
    setCurrentPage(nextPage)
  }

  //Logic button Prev
  const prevHandler = ()=> {
    const prevPage = currentPage -1;
    if(prevPage < 0) return;
    const firstIndex = prevPage * pageSize
    const arr = [...datosFromApi].splice(firstIndex, pageSize)
    setItems(arr)
    setCurrentPage(prevPage)
  }
  

    return (
      <>
        <Menu 
          allServers={allServers}
        />
        <Servers 
        clients={items} 
        items={datosFromApi}
        nextHandler={nextHandler} 
        prevHandler={prevHandler} 
        currentPage={currentPage}
        viewServers={viewServers}
        
        />
    </>
  )
}

export default Index