import React from "react";
import './Create.css'
import {v4 as uuidv4} from 'uuid';
import { saveTodoItemsToLocalStorage } from '../../Service/Service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


function CreateTODO(props){
    const {ToDoItems,setToDoItems,display,setdisplay,update,setupdate,theme,completed,important,setcompleted,setimportant} = props;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (update) {
        // Update existing task
        const updatedItems = ToDoItems.map((item) => {
          if (item.id === update.id) {
            return {
              ...item,
              Title: document.getElementById('title').value,
              date: document.getElementById('date').value,
              description: document.getElementById('description').value || '',
              completed: item.completed,
              priority: item.priority,
            };
          }
          return item;
        });
    
        setToDoItems(updatedItems);
        saveTodoItemsToLocalStorage('item', updatedItems);
        handleNewTask(); // Reset the update state
      } else {
        // Add new task
        const items = [
          {
            id: uuidv4(),
            Title: document.getElementById('title').value,
            date: document.getElementById('date').value,
            description: document.getElementById('description').value || '',
            completed: document.getElementById('completed').checked,
            priority: document.getElementById('imp').checked,
            deleted: false,
          },
          ...ToDoItems,
        ];
    
        if (items[0].completed) setcompleted((prevCompleted) => prevCompleted + 1);
        if (items[0].priority) setimportant((prevImportant) => prevImportant + 1);
        setToDoItems(items);
        handleNewTask();
        saveTodoItemsToLocalStorage('item', items);
      }
    
      document.getElementById('taskform').reset();
    };
    
    
      

    const handleNewTask = () =>{
        setdisplay(!display)
        setupdate(null)
    }


    return(
        <div className="creationcontainer">
            {display?<label className="background" onClick={handleNewTask}/>:''}

            <button className="newtask1" onClick={handleNewTask}>
                <label>Add a new Task</label>
            </button>
            {
              update?
              <form onSubmit={handleSubmit} id='taskform' className={display?theme?'creationform darkform':'creationform':"formdisplay"}>
              <header>
                  <label className="caption" style={{color:theme?'#fff':''}}>Edit task</label>
                  <label className="close" onClick={handleNewTask} style={{color:theme?'#fff':''}}><FontAwesomeIcon icon={faXmark}/></label>
              </header>
              <div>
                  <label style={{color:theme?'#fff':''}}>Title</label>
                  <input type='text' placeholder="e.g, Need to read this book" id='title' defaultValue={update ? update.Title : ''} required/>
              </div>
              <div>
                  <label style={{color:theme?'#fff':''}}>Date</label>
                  <input type='date' id='date' required defaultValue={update ? update.date : ''}/>
              </div>
              <div>
                  <label style={{color:theme?'#fff':''}}>Description (optional)</label>
                  <textarea placeholder="e.g, need to gain knowledge" id='description' defaultValue={update ? update.description : ''}/>
              </div>
              <button type="submit">update the task</button>
          </form>


              :
              <>
              {display?<label className="background" onClick={handleNewTask}/>:''}

                <form onSubmit={handleSubmit} id='taskform' className={display?theme?'creationform darkform':'creationform':"formdisplay"}>
                  
                <header>
                    <label className="caption" style={{color:theme?'#fff':''}}>{update?'Edit task':'Add a Task'}</label>
                    <label className="close" onClick={handleNewTask} style={{color:theme?'#fff':''}}><FontAwesomeIcon icon={faXmark}/></label>
                </header>
                <div>
                    <label style={{color:theme?'#fff':''}}>Title</label>
                    <input type='text' style={{backgroundColor:theme?'rgb(68, 68, 93)':'',color:theme?'white':''}} placeholder="e.g, Need to read this book" id='title' defaultValue={update ? update.Title : ''} required/>
                </div>
                <div>
                    <label style={{color:theme?'#fff':''}}>Date</label>
                    <input type='date' id='date' style={{backgroundColor:theme?'rgb(68, 68, 93)':'',color:theme?'white':''}} required defaultValue={update ? update.date : ''}/>
                </div>
                <div>
                    <label style={{color:theme?'#fff':''}}>Description (optional)</label>
                    <textarea style={{backgroundColor:theme?'rgb(68, 68, 93)':'',color:theme?'white':''}} placeholder="e.g, need to gain knowledge" id='description' defaultValue={update ? update.description : ''}/>
                </div>
                <div className="radiodiv">
                    <input type="checkbox" id='imp'/>
                    <label htmlFor='imp' className="important" style={{color:theme?'#fff':''}}><span></span></label>
                    <label style={{color:theme?'#fff':''}} >Mark as important</label>
                </div>
                <div className="radiodiv">
                    <input type="checkbox" id='completed'/>
                    <label htmlFor='completed' className="completed" style={{color:theme?'#fff':''}}><span></span></label>
                    <label style={{color:theme?'#fff':''}}>Mark as completed</label>
                </div>
                <button type="submit">{update?'update the task':'Add a task'}</button>
            </form>
            </>
            }
        </div>
    )
}


export default CreateTODO;