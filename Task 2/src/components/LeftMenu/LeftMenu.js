import React, { useState, useEffect, useMemo } from "react";
import './LeftMenu.css'

function LeftMenu(props){
    const {theme, 
            ToDoItems, 
            completed,
            important,
            settemporary, 
            activeMenu, 
            setactiveMenu,
            todaytasks,
            settodaytasks,
            temporary,
            settodaytasksnames,
            deletedtasks,
            setdeletedtasks
          } = props;
    

    

    const [impuncompleted,setimpuncompleted] = useState(0)
    const [todayuncompleted,settodayuncompleted] = useState(0);

    const handleimportant = () =>{
        const importanttasks = ToDoItems.filter(item => item.priority && !item.deleted);
        setimpuncompleted(importanttasks.filter(item => !item.completed).length)
        settemporary(importanttasks)
    }


    const date = useMemo(() => new Date(), []);


    //to handle the todays tasks
    const handletoday = () => {
        const importanttasks = ToDoItems.filter(item => {
          const s = item.date.split("-");
          return (
            parseInt(s[0]) === parseInt(date.getFullYear()) &&
            parseInt(s[1]) === parseInt(date.getMonth() + 1) &&
            parseInt(s[2]) === parseInt(date.getDate())
            && !item.deleted
          );
        });

        settodaytasksnames(importanttasks.filter(item=>{return(item.Title)}))
      
        const uncompletedTasks = importanttasks.filter(item => !item.completed);
        settemporary(importanttasks);
        settodayuncompleted(uncompletedTasks.length);
      };


      const handleCompleted =() =>{
            settemporary(ToDoItems.filter(items=>items.completed && !items.deleted))
      }

      const handleunCompleted = () =>{
            settemporary(ToDoItems.filter(items=>!items.completed && !items.deleted))
      }


      const handleDeletedtasks = () =>{
        settemporary(ToDoItems.filter(items=>!items.deleted))
      }
      



    useEffect(() => {
        
        //to store the important tasks
        const importanttasks = ToDoItems.filter(item => item.priority && !item.deleted);
        //to count the uncompleted tasks in important tasks
        setimpuncompleted(
            importanttasks.filter((item) => !item.completed && !item.deleted).length
          );
        let todaycount = 0;

        //to count the number of tasks on that day
        let todays = 0;

        let todaytasksnamesTitle = [];
        ToDoItems.map((items)=>{
            let s = items.date.split('-')
            if (
                parseInt(s[0]) === parseInt(date.getFullYear()) &&
                parseInt(s[1]) === parseInt(date.getMonth() + 1) &&
                parseInt(s[2]) === parseInt(date.getDate()) &&
                !items.deleted
              ){          
                todaytasksnamesTitle=[{'id':items.id,
                                      'Title':items.Title,
                                      'completed':items.completed,
                                      'important':items.priority
                                    },
                                    ...todaytasksnamesTitle]      
                todaycount+=1
                todays=!items.completed?todays+1:todays
            }
            return 0;
        })

        settodaytasksnames(todaytasksnamesTitle)
        settodayuncompleted(todays)
        settodaytasks(todaycount)

      }, [ToDoItems, settemporary,todaytasks, settodaytasks,date, todayuncompleted, temporary, settodaytasksnames]);


    //to set all the tasks to temporary
    const handleall = () =>{
        settemporary(ToDoItems.filter((items)=>!items.deleted))
    }

    const handleMenu = (e) =>{
        const items = [false,false,false,false,false]
        items[e]=!items[e]
        setactiveMenu(items)
        if(items[0]){
            handleall()
        }
        if(items[1]){
            handleimportant();
        }
        if(items[2]){
            handletoday();
        }
        if(items[3]){
            handleCompleted()
        }
        if(items[4]){
            handleunCompleted()
        }
        if(items[5]){
            handleDeletedtasks()
        }
    }


    const [totallength,settotallength] = useState(0)
    useEffect(() => {
        settotallength(ToDoItems.filter((items) => !items.deleted).length);
      }, [ToDoItems, settotallength]);
      
    return(
        <div className="leftContainer" style={{backgroundColor:theme?'rgb(12, 9, 36)':''}}>
            <label style={{color:theme?'white':''}}>To-Do List</label>
            <div className="menu">
                <button className={activeMenu[0]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(0))} >All tasks({totallength>99?`${99}+`:totallength})<label className="menucount" style={{display:totallength-completed>0?'':'none'}}>{totallength>99?`${99}+`:totallength-completed}</label></button>
                <button className={activeMenu[1]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(1))} >Important tasks({important>99?`${99}+`:important})<label className="menucount" style={{display:impuncompleted>0?'':'none'}}>{impuncompleted>99?`${99}+`:impuncompleted}</label></button>
                <button className={activeMenu[2]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(2))} >Today's tasks({todaytasks>99?`${99}+`:todaytasks})<label className="menucount" style={{display:todayuncompleted>0?'':'none'}}>{todayuncompleted>99?`${99}+`:todayuncompleted}</label></button>
                <button className={activeMenu[3]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(3))} >completed tasks({completed>99?`${99}+`:completed})</button>
                <button className={activeMenu[4]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(4))} >Pending tasks({totallength-completed>99?`${99}+`:totallength-completed})</button>
                <button className={activeMenu[5]?theme?'darkactive':'active':theme?'darktheme':''} onClick={()=>(handleMenu(5))} >History({deletedtasks>99?`${99}+`:deletedtasks})</button>
            </div>
        </div>
    )
}

export default LeftMenu;