import React, { useEffect, useState } from "react";
import './ToDoList.css'
import {saveTodoItemsToLocalStorage } from '../../Service/Service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEllipsisVertical, faClose, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar , faRotateBack} from "@fortawesome/free-solid-svg-icons";
import { faStar as regstar, faCalendarDays} from "@fortawesome/free-regular-svg-icons";


function ToDoList(props){
    const {
      ToDoItems,
      setToDoItems, 
      completed, 
      setcompleted, 
      display,
      setdisplay, 
      layout, 
      setupdate,
      theme,
      important,
      setimportant,
      temporary,
      settemporary,
      activeMenu,
      deletedtasks,
      setdeletedtasks,
      selectedOptions
    } = props;

    const [deleteitem,setdeleteitem] = useState(false)
    const [id,setid] = useState('')


    const handleCompletion = (e) => {
        const id = e.target.name;
        // Create a new array with the modified completed property
        const newToDoItems = ToDoItems.map((item) => {
          if (item.id === id) {
            !item.completed?setcompleted(completed+1):setcompleted(completed-1)
            return {
              ...item, // Keep other properties of the item
              completed: !item.completed, // Toggle the completed property
            };
          }
          return item; // Return the item as it is
        });
      
        setToDoItems(newToDoItems); // Update the state with the new array
        saveTodoItemsToLocalStorage('item',newToDoItems)
      };

    const handleNewTask = (olditem) =>{
        setdisplay(!display)
        setupdate(olditem)
    }
      
    
    //to close the delete menu
    
    const handletoggleDelete = () =>{
      setdeleteitem(false)
    }


    //to show the delete menu and get the id

    const handleDeleteMenu = (e)=>{
        setdeleteitem(true)
        setid(e)
    }

    const handleDelete = () =>{
        // const newTodoItems = ToDoItems.filter(item => item.id !== id)
        

        const newTodoItems = ToDoItems.map((item) => {
          if (item.id === id) {
            !item.deleted?setdeletedtasks(deletedtasks+1):setdeletedtasks(deletedtasks-1)

            return {
              ...item, // Keep other properties of the item
              deleted: !item.deleted, // Toggle the completed property
            };
          }
          return item; // Return the item as it is
        });


        setToDoItems(newTodoItems)
        saveTodoItemsToLocalStorage('item', newTodoItems)

        const completedCount = newTodoItems.filter(item => item.completed && !item.deleted).length;
        const importantCount = newTodoItems.filter(item => item.priority && !item.deleted).length;

        setimportant(importantCount)
        setcompleted(completedCount);
        setdeleteitem(false)
    }


    const handleCompleteDelete = () =>{
      const newTodoItems = ToDoItems.filter(item => item.id !== id)

      setToDoItems(newTodoItems)
      saveTodoItemsToLocalStorage('item', newTodoItems)

      const completedCount = newTodoItems.filter(item => item.completed && !item.deleted).length;
      const importantCount = newTodoItems.filter(item => item.priority && !item.deleted).length;

      setdeletedtasks(deletedtasks-1)
      setimportant(importantCount)
      setcompleted(completedCount);
      setdeleteitem(false)
  }


  const handleRestore = (id) => {
    const updatedItems = ToDoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          deleted: !item.deleted,
        };
      }
      return item;
    });
  
    setToDoItems(updatedItems);
    saveTodoItemsToLocalStorage('item', updatedItems);
  
    const completedCount = updatedItems.filter(
      (item) => item.completed && !item.deleted
    ).length;
    const importantCount = updatedItems.filter(
      (item) => item.priority && !item.deleted
    ).length;
    const deletedCount = updatedItems.filter((item) => item.deleted).length;
  
    setimportant(importantCount);
    setcompleted(completedCount);
    setdeletedtasks(deletedCount);
  };
  


    const handleStar = (id) =>{
      const newToDoItems = ToDoItems.map((item) => {
        if (item.id === id) {
          !item.priority?setimportant(important+1):setimportant(important-1)
          return {
            ...item, // Keep other properties of the item
            priority: !item.priority, // Toggle the completed property
          };
        }
        return item; // Return the item as it is
      });
    
      setToDoItems(newToDoItems); // Update the state with the new array
      saveTodoItemsToLocalStorage('item',newToDoItems)
    }


    useEffect(() => {
      const savedItems = localStorage.getItem('item');
      if (savedItems) {
        setToDoItems(JSON.parse(savedItems));
        const completedCount = JSON.parse(savedItems).filter(item => item.completed && !item.deleted).length;
        const importantCount = JSON.parse(savedItems).filter(item => item.priority && !item.deleted).length;
        const deletedCount = JSON.parse(savedItems).filter(item => item.deleted).length
        setimportant(importantCount)
        setcompleted(completedCount);
        setdeletedtasks(deletedCount)
      }
    }, [setToDoItems,setcompleted,setimportant]);


    useEffect(() => {
      // Update temporary state when ToDoItems changes
      if(activeMenu[0]){
        settemporary(ToDoItems.filter(item => !item.deleted))
      }
      if(activeMenu[1]){
        const importanttasks = ToDoItems.filter(item => item.priority && !item.deleted);
        settemporary(importanttasks );
      }
      if(activeMenu[2]){
        var date = new Date();
        let importanttasks = [];
        ToDoItems.map((items)=>{
            let s = items.date.split('-')
            if(parseInt(s[0])===parseInt(date.getFullYear()) && parseInt(s[1])===parseInt(date.getMonth()+1) && parseInt(s[2])===parseInt(date.getDate()) && !items.deleted){
                importanttasks=[...importanttasks,items]
            }
            return 0;
        })
        settemporary(importanttasks)
      }
      if(activeMenu[3]){
        settemporary(ToDoItems.filter(items=>items.completed&& !items.deleted))
      }
      if(activeMenu[4]){
        settemporary(ToDoItems.filter(items=>!items.completed && !items.deleted))
      }
      if(activeMenu[5]){
        settemporary(ToDoItems.filter(items=>items.deleted))
      }
    }, [ToDoItems, settemporary, activeMenu]);



    
    

    return(
        <div className={layout?'gridcontainer':"taskcontainer"}>
            {
              temporary.length>0?
                temporary.map((items)=>(
                    activeMenu[5]?
                    <div className={layout?theme?"darkgridlayout gridlayout deleted":"gridlayout deleted":theme?'darktasks tasks deleted':"tasks deleted"} key={items.id}>
                        <div className="grayscale"/>
                        <div className="abouttask">
                          <p className="taskname" id='taskname' style={{color:theme?'white':''}}>
                            {
                              layout?
                              String(items.Title).length>20? String(items.Title).slice(0,20)+'..':items.Title
                              :
                              String(items.Title).length>40? String(items.Title).slice(0,40)+'..':items.Title
                              
                            }
                          </p>
                          <p className={layout?'griddescription':'description'} style={{color:theme?'white':''}}>{`${String(items.description).slice(0,130)} ${String(items.description).length>130?'...':''}`}</p>
                          <p className={layout?'griddate':"date"} style={{color:theme?'white':''}}><FontAwesomeIcon icon={faCalendarDays}/> {String(items.date).slice(8)+'/'+String(items.date).slice(5,7)+'/'+String(items.date).slice(0,4)}</p>
                        </div>
                        <div className={layout?'gridbuttons':"buttons2"}>
                          <button onClick={handleCompletion} name={items.id} className="taskcompleted" style={{backgroundColor:items.completed?'rgb(156, 255, 204)':'',color:items.completed?'darkgreen':''}} disabled><label>{items.completed?'completed':'uncompleted'}</label><FontAwesomeIcon icon={items.completed?faCheck:faClose}/></button>
                          <button disabled onClick={()=>{handleStar(items.id)}} className="star" ><FontAwesomeIcon icon={items.priority?faStar:regstar}></FontAwesomeIcon></button>
                          <button className="restore restore-button" onClick={()=>{handleRestore(items.id)}}><FontAwesomeIcon icon={faRotateBack}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    :
                    <div className={layout?theme?"darkgridlayout gridlayout":"gridlayout":theme?'darktasks tasks':"tasks"} key={items.id}>
                        <div className="abouttask">
                          <p className="taskname" id='taskname' style={{color:theme?'white':''}}>
                            {
                              layout?
                              String(items.Title).length>20? String(items.Title).slice(0,20)+'..':items.Title
                              :
                              String(items.Title).length>40? String(items.Title).slice(0,40)+'..':items.Title
                              
                            }
                          </p>
                          <p className={layout?'griddescription':'description'} style={{color:theme?'white':''}}>{`${String(items.description).slice(0,130)} ${String(items.description).length>130?'...':''}`}</p>
                          <p className={layout?'griddate':"date"} style={{color:theme?'white':''}}><FontAwesomeIcon icon={faCalendarDays}/> {String(items.date).slice(8)+'/'+String(items.date).slice(5,7)+'/'+String(items.date).slice(0,4)}</p>
                        </div>
                        <div className={layout?'gridbuttons':"buttons2"}>
                          <button onClick={handleCompletion} name={items.id} className="taskcompleted" style={{backgroundColor:items.completed?'rgb(156, 255, 204)':'',color:items.completed?'darkgreen':''}}>{items.completed?'completed':'uncompleted'}</button>
                          <button onClick={handleCompletion} name={items.id} className="taskcompleted completionicons" style={{backgroundColor:items.completed?'rgb(156, 255, 204)':'',color:items.completed?'darkgreen':''}}><FontAwesomeIcon icon={items.completed?faCheck:faXmark}/></button>
                          <button onClick={()=>{handleStar(items.id)}} className="star"><FontAwesomeIcon icon={items.priority?faStar:regstar}></FontAwesomeIcon></button>
                          <button className="delete" onClick={()=>{handleDeleteMenu(items.id)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                          <button className="taskoptions" onClick={()=>{handleNewTask(items)}} style={{color:theme?'white':''}}><FontAwesomeIcon icon={faEllipsisVertical}/></button>
                        </div>
                    </div>
                ))
              :
              ''
            }
            {
              activeMenu[5]?
              ''
              :
              <label className={layout?'gridtasklayout':"taskadder"} onClick={()=>{handleNewTask(null)}}>
                <label style={{color:theme?'white':''}}>Add a new Task</label>
              </label>
            }
            {
              deleteitem?
                <div className="deletemenu" style={{backgroundColor:theme?'#24203a':'',boxShadow:theme?'none':''}}>
                  <div className="header">
                    <label style={{color:theme?'white':''}}>Are you sure?</label>
                    <label onClick={handletoggleDelete} name='close' className="close" style={{color:theme?'white':''}}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></label>
                  </div>
                  <p>This task will be deleted from here andyou can't restore it!</p>
                  <div className="deletetaskbtn">
                    <button className="cancel" onClick={handletoggleDelete} style={{color:theme?'white':''}}>cancel</button>
                    <button className="deletetask" onClick={activeMenu[5]?()=>{handleCompleteDelete(handleCompleteDelete())}:()=>{handleDelete(handleDelete())}}>Confirm</button>
                  </div>
                </div>
              :
              ''
            }
        </div>
    )
}

export default ToDoList