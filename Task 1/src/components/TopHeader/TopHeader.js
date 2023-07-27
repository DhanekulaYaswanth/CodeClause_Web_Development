import React, { useState, useEffect } from "react";
import './TopHeader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { saveTodoItemsToLocalStorage } from '../../Service/Service';

function TopHeader(props) {
  const { ToDoItems, layout, setlayout, theme, activeMenu, important, todaytasks, completed, deletedtasks, temporary, settemporary } = props;

  const [search, setsearch] = useState('');

  useEffect(() => {
    // Filter the temporary array based on the search term
    const filteredItems = ToDoItems.filter((item) =>
      item.Title.toLowerCase().includes(search.toLowerCase())
    );
    settemporary(filteredItems);
  }, [search, ToDoItems]);

  const handlesearch = (e) => {
    setsearch(e.target.value);
  }

  const handleLayout = (e) => {
    if (e.target.value === 'list') {
      setlayout(false);
      saveTodoItemsToLocalStorage('layout', [{ 'tasklayout': false }])
    } else {
      setlayout(true);
      saveTodoItemsToLocalStorage('layout', [{ 'tasklayout': true }])
    }
  };

  const closenoresult= () =>{
    setsearch('')
    // document.getElementById('searchbox').value=''
  }

  const [totallength, settotallength] = useState(0);
  useEffect(() => {
    settotallength(ToDoItems.filter((items) => !items.deleted).length);
  }, [ToDoItems, settotallength]);

  const getTasksCountLabel = () => {
    if (activeMenu[0]) return `${totallength} ${totallength !== 1 ? 'tasks' : 'task'}`;
    if (activeMenu[1]) return `${important} ${important !== 1 ? 'tasks' : 'task'}`;
    if (activeMenu[2]) return `${todaytasks} ${todaytasks !== 1 ? 'tasks' : 'task'}`;
    if (activeMenu[3]) return `${completed} ${completed !== 1 ? 'tasks' : 'task'}`;
    if (activeMenu[4]) return `${totallength - completed} ${totallength - completed !== 1 ? 'tasks' : 'task'}`;
    return `${deletedtasks} ${deletedtasks !== 1 ? 'tasks' : 'task'}`;
  };

  return (
    <div className="topcontainer">
        {temporary.length===0 && search.length!==0?<label className="noresult" onClick={closenoresult}>No resuts found<label style={{color:"white", fontSize:'20px'}}>(click anywhere to close this)</label></label>:''}
        <form>
          <input type="text" id='searchbox' onChange={handlesearch} placeholder="search tasks" className="search" />
          <label className="searchicon" style={{ color: theme ? 'gray' : '' }}><FontAwesomeIcon icon={faSearch} /></label>
        </form>
        <div className="tasklayoutgrid">
          <label className="taskscount" style={{ color: theme ? 'white' : '' }}>
            {getTasksCountLabel()}
          </label>
          <div className="taskrep">
          <input
            type="radio"
            id="listbox"
            name="group1"
            value="list"
            onClick={handleLayout}
            onChange={() => { }}
            checked={!layout} // Set checked to true if layout is false
          />
          <input
            type="radio"
            id="gridbox"
            name="group1"
            value="grid"
            onClick={handleLayout}
            onChange={() => { }}
            checked={layout} // Set checked to true if layout is true
          />

          <label className="list" htmlFor="listbox">
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
          </label>

          <label className="grid" htmlFor="gridbox">
            <label className="grid1" htmlFor="gridbox"></label>
            <label className="grid2" htmlFor="gridbox"></label>
            <label className="grid3" htmlFor="gridbox"></label>
            <label className="grid4" htmlFor="gridbox"></label>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
