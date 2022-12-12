import React from 'react'
import db from '../../services/FirebaseConfig'
import { collection, query, orderBy,onSnapshot,where } from "firebase/firestore";
import Modal_view from '../common/modal_view'
import './view.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Info_general from './info_general'
import Interview from './interview'
import Interacts from './server_relation';


function View(props) {

    const [task, setTask] = useState([])
    const [items, setItems] = useState();
    const [all_relation, setAllRelation] = useState([])
    const [relation, setRelation] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [render, setRender] = useState(false);
    const arr = [...task].splice(0,pageSize);
    const arr2 = [...relation].splice(0,pageSize);
   

      const collection_task = collection(db, "tasks");
      const query_task = query(collection_task, orderBy('date', 'asc'),where('ids','==',props.id));

      const collection_relation = collection(db, "interacts");
      const query_relation = query(collection_relation, where('ids','==',props.id));

    
      const loadDocuments = () => {
        setItems(arr)
        setRelation(arr2)
        console.log(relation)
      }

      useEffect(()=> {

        const data_task = onSnapshot(query_task, (querySnapshot) => {
          const taskAdd = [];
          querySnapshot.forEach((doc) => {
              taskAdd.push({id:doc.id,...doc.data()});
              setTask([...taskAdd])
            });
          });


          const data_relations = onSnapshot(query_relation, (querySnapshot) => {
          const relationAdd = [];
          querySnapshot.forEach((doc) => {
              relationAdd.push({id:doc.id,...doc.data()});
              setAllRelation([...relationAdd])
            });
          });
    
          setItems(arr)
          setRelation(arr2)

        // loadDocuments()
        // setRender(true)
      },[task.length])


      const getTask = ()=> {
  
        // const data_task = onSnapshot(query_task, (querySnapshot) => {
        // const taskAdd = [];
        // querySnapshot.forEach((doc) => {
        //     taskAdd.push({id:doc.id,...doc.data()});
        //     setTask([...taskAdd])
        //   });
        // });

        // const data_relations = onSnapshot(query_relation, (querySnapshot) => {
        // const relationAdd = [];
        // querySnapshot.forEach((doc) => {
        //     relationAdd.push({id:doc.id,...doc.data()});
        //     setAllRelation([...relationAdd])
        //     console.log(all_relation)
        //   });
        // });
  
      }


      
// Interview - Start
      const nextHandler = () => {
        const allElements = task.length;
        const nextPage = currentPage  + 1;
        const firstIndex = nextPage * pageSize;
        if( firstIndex >= allElements) return; 
        const arra = [...task].splice(firstIndex, pageSize);
        setItems(arra)
        setCurrentPage(nextPage)
      }
      
      const prevHandler = ()=> {
        const prevPage = currentPage -1;
        if(prevPage < 0) return;
        const firstIndex = prevPage * pageSize
        const arr = [...task].splice(firstIndex, pageSize)
        setItems(arr)
        setCurrentPage(prevPage)
      }
// Interview - End

      const nextHandlerI = () => {
        const allElements = all_relation.length;
        const nextPage = currentPage  + 1;
        const firstIndex = nextPage * pageSize;
        if( firstIndex >= allElements) return; 
        const arra = [...all_relation].splice(firstIndex, pageSize);
        setRelation(arra)
        setCurrentPage(nextPage)
      }

      const prevHandlerI = ()=> {
        const prevPage = currentPage -1;
        if(prevPage < 0) return;
        const firstIndex = prevPage * pageSize
        const arr = [...all_relation].splice(firstIndex, pageSize)
        setRelation(arr)
        setCurrentPage(prevPage)
      }

    
  return (
    <>
        <Modal_view 
            title_modal={`Información de ${props.name}`}
            getDocuments={()=>{getTask();loadDocuments()}}
            body={
              <>
                  <div className="container text-center">
                    <div className="row">
                      <div className="col">
                        <Info_general 
                          id={props.id}
                          company={props.company}
                          provider={props.provider}
                          contact_provider={props.contact_provider}
                          name={props.name}
                          description={props.description}
                          so = {props.so}
                          notes={props.notes}
                        />
       
                      </div>

                      {/*  */}
                      <div className="col">
                        <Interview 
                          items={items}
                          id={props.id}
                          name={props.name}
                          prevHandler={prevHandler}
                          nextHandler={nextHandler}
                          currentPage={currentPage}
                          render={render}
                        />

                      </div>

                      {/*  */}
                      <div className="col">
                        <Interacts 
                          id={props.id}
                          name={props.name}
                          relation={relation}
                          prevHandlerI={prevHandlerI}
                          nextHandlerI={nextHandlerI}
                          render={render}
                          currentPage={currentPage}
                        />
                      </div>
                    </div>
                  </div>

              </>
            }
        
        />
        
    </>
  )
}

export default View