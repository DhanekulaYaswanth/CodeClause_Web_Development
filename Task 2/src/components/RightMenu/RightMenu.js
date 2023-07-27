import React, { useEffect, useState } from "react";
import './RightMenu.css'
import { getToDoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from "../../Service/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faStar, faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

function RightMenu(props){

    const {ToDoItems, completed,setcompleted, setToDoItems, theme, settheme, setimportant,
            todaytasksnames,
            setdeletedtasks,
                } = props;

    const [clear,setclear] = useState(false)

    const handleClear = (e) => {
        setclear(!clear);
        if (e === 1) {
          const updatedToDoItems = ToDoItems.map(item => {
            if (!item.deleted) {
              return {
                ...item,
                deleted: true
              };
            }
            return item;
          });
      
          setdeletedtasks(ToDoItems.length)
          setToDoItems(updatedToDoItems);
          saveTodoItemsToLocalStorage('item',updatedToDoItems)
          setimportant(0);
          setcompleted(0);
        }
      };
      


    

    const handleTheme = () =>{
        saveTodoItemsToLocalStorage('theme',[{'dark':!theme}]);
        settheme(!theme)
    }

    useEffect(() => {
        const themeArray = getToDoItemsFromLocalStorage('theme');
        if (themeArray && themeArray.length > 0) {
          document.getElementById("theme").checked = themeArray[0].dark;
        }
      }, []);
      
    
    const width =completed / ToDoItems.filter((items)=>!items.deleted).length? (completed / ToDoItems.filter((items)=>!items.deleted).length) * 100: completed / ToDoItems.filter((items)=>!items.deleted).length!==0?100:0 ;




    return(
        <div className="rightcontainer" style={{backgroundColor:theme?'rgb(12, 9, 36)':''}}>
            <div className="profile">
                <div className="personal">
                    <label className="profilepic">DY</label>
                    <label className="username" style={{color:theme?'rgb(191, 191, 191)':''}}>Hii user!</label>
                </div>
                <div className="theme">
                    <input type="checkbox" id='theme' onChange={handleTheme}/>
                    <label className="themelabel" style={{color:theme?'rgb(193, 192, 192)':''}}>Darkmode</label>
                    <label htmlFor="theme" className="outer" style={{backgroundColor:theme?'#fff':''}}></label>
                </div>
                <div className="taskprogress">
                    <div className="counting">
                        <label className="tasklabel" style={{color:theme?'rgb(255, 250, 245)':''}}>All tasks</label>
                        <label className="count" style={{color:theme?'rgb(255, 250, 245)':''}}>{completed}/{ToDoItems.filter((items)=>!items.deleted).length}</label>
                    </div>
                    <span className="progressbarouter" style={{backgroundColor:theme?'gray':''}}><span className="progressbarinner" style={{width:`${width}%`}}></span></span>
                </div>
                <div className="todaytask">
                    {
                        todaytasksnames.length!==0?
                        <React.Fragment>
                            <label style={{color:theme?'#fff':''}} className="todayheading">Today's tasks</label>
                            <div className="todaytasknamescontainer">
                                {todaytasksnames.map((item)=>(
                                    <label key={item.id} className="todaytasksnames" style={{color:theme?'gray':'gray'}}>{String(item.Title).length>20? String(item.Title).slice(0,20)+'..':item.Title}
                                        <label style={{display:'flex',gap:'5px'}}>
                                            {item.important?<FontAwesomeIcon icon={faStar} style={{color:'gold'}}/>:''}
                                            {item.completed?<FontAwesomeIcon icon={faCheck} style={{color:theme?'lightgreen':'green'}}/>:<FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>}
                                        </label>
                                    </label>
                                    
                                ))}
                            </div>
                        </React.Fragment>
                        :
                        <label className="notasks" style={{color:theme?'gray':''}}>No tasks for today</label>
                    }
                </div>
            </div>
            <div className="clear">

                <button onClick={handleClear} style={{color:theme?'rgb(255, 86, 86)':''}}>Delete all tasks</button>
            </div>
            {clear?<label className="background" onClick={handleClear}/>:''}
            {
              clear?
                <div className="deletemenu" style={{backgroundColor:theme?'#24203a':'',boxShadow:theme?'none':''}}>
                  <div className="header">
                    <label style={{color:theme?'white':''}}>Are you sure?</label>
                    <label onClick={handleClear} name='close' className="close" style={{color:theme?'white':''}}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></label>
                  </div>
                  <p>All tasks will be deleted from here!</p>
                  <div className="deletetaskbtn">
                    <button className="cancel" onClick={handleClear} style={{color:theme?'#fff':''}}>cancel</button>
                    <button className="deletetask" onClick={()=>{handleClear(1)}}>Confirm</button>
                  </div>
                </div>
              :
              ''
            }
        </div>

    )
}

export default RightMenu;