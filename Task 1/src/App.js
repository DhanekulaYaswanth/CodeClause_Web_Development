import React,{useState} from "react";
import './App.css'
import CreateTODO from "./components/Create/Create";
import ToDoList from "./components/ToDoList/ToDoList"
import { getToDoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './Service/Service';
import TopHeader from "./components/TopHeader/TopHeader";
import RightMenu from "./components/RightMenu/RightMenu";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUser, faBars } from "@fortawesome/free-solid-svg-icons";

function App(){

  const [ToDoItems,setToDoItems] = useState(getToDoItemsFromLocalStorage('item') || []);
  const [temporary,settemporary] = useState(ToDoItems)
  const [display,setdisplay] = useState(false);

  const [update,setupdate] = useState(null);

  const initialLayout = getToDoItemsFromLocalStorage('layout') || [];
  const initialTheme = getToDoItemsFromLocalStorage('theme') || [];

  const [layout, setlayout] = useState(initialLayout.length > 0 ? initialLayout[0].tasklayout : '');
  const [theme, settheme] = useState(initialTheme.length > 0 ? initialTheme[0].dark : false);


  const [todaytasksnames,settodaytasksnames] = useState([])

  const [activeMenu,setactiveMenu] = useState([true,false,false,false,false])

  const [completed,setcompleted] = useState(0);
  const [important,setimportant] = useState(0)
  const [todaytasks,settodaytasks] = useState(0);
  const [deletedtasks,setdeletedtasks] = useState(0);


  const date = new Date();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  const [clear,setclear] = useState(false)
  const handleClear = (e) => {
    setclear(!clear);
    if (e === 1) {
      const updatedToDoItems = ToDoItems.filter(item => !temporary.includes(item));
      settemporary([]);
      setToDoItems(updatedToDoItems);
      saveTodoItemsToLocalStorage('item', updatedToDoItems);
      setimportant(updatedToDoItems.filter((items) => items.priority).length);
      setcompleted(updatedToDoItems.filter((items) => items.completed).length);
      setdeletedtasks(0);
    }
  };

  // const [selectedOptions, setSelectedOptions] = useState([]);



  // let availableOptions = [
  //   { value: "EarlierFirst", label: "Earlier first" },
  //   { value: "LaterFirst", label: "Later first" },
  //   { value: "Orderadded", label: "Order added" },
  //   { value: "ImportantFirst", label: "Important first" },
  // ];


  // const [availableoptions,setavailableoptions] = useState(availableOptions)


  // const handlesort = (event) => {
  //   const selectedValues = Array.from(event.target.options)
  //     .filter((option) => option.selected)
  //     .map((option) => option.value);
    
  //   const options = availableoptions.filter(
  //       (option) => option.value!==selectedValues[0].toString()
  //     );

  //   setavailableoptions(options)
      

  //   setSelectedOptions([selectedValues,...selectedOptions]);
  // };

  // const handleFilterRemove = (e) => {
  //   const valueToRemove = e[0].toString(); // Convert to string
  //   const updatedSelectedOptions = selectedOptions.filter((item) => item.toString() !== valueToRemove);
  //   setSelectedOptions(updatedSelectedOptions);
  //   const option = availableOptions.filter((option)=>option.value===valueToRemove)
  //   setavailableoptions([option[0],...availableoptions])
  // };
  

  

  
  
  return(
    <div className="maincontainer">
      <input type="checkbox" id='leftmenubox'/>
      <label htmlFor="leftmenubox"><FontAwesomeIcon icon={faBars} className="leftbars" style={{color:theme?'':'black'}}/></label>
      <label htmlFor="leftmenubox" className="leftmenuclose"></label>
      <label className="leftmenu" htmlFor="leftmenubox">
        <LeftMenu 
            theme={theme} 
            ToDoItems={ToDoItems} 
            completed={completed} 
            important={important} 
            temporary={temporary} 
            settemporary={settemporary} 
            activeMenu={activeMenu} 
            setactiveMenu={setactiveMenu} 
            todaytasks={todaytasks} 
            settodaytasks={settodaytasks} 
            todaytasksnames={todaytasksnames} 
            settodaytasksnames={settodaytasksnames}
            deletedtasks={deletedtasks}
            setdeletedtasks={setdeletedtasks}
        />
      </label>
      <div className="App" style={{backgroundColor:theme?'#080923f5':''}}>
        <div className="topheader">
          <TopHeader ToDoItems={ToDoItems} layout={layout} setlayout={setlayout} theme={theme} activeMenu={activeMenu} important={important} todaytasks={todaytasks} completed={completed} deletedtasks={deletedtasks} temporary={temporary} settemporary={settemporary}/>
          <div className="date_newtask">
            <label className="todaydate" style={{color:theme?'#fff':''}}>{` ${date.getFullYear()},  ${months[date.getMonth()]} ${date.getDate()}  `}</label>
            <div className="sorting">
              <CreateTODO ToDoItems={ToDoItems} setToDoItems={setToDoItems} display={display} theme={theme} setdisplay={setdisplay} update={update} setupdate={setupdate} completed={completed} important={important} setcompleted={setcompleted} setimportant={setimportant}/>
            </div>
          </div>
        </div>
        <ToDoList ToDoItems={ToDoItems} 
                  setToDoItems={setToDoItems} 
                  completed={completed} 
                  setcompleted={setcompleted} 
                  important={important} 
                  setimportant={setimportant} 
                  display={display} 
                  setdisplay={setdisplay} 
                  layout={layout} 
                  setupdate={setupdate} 
                  theme={theme} 
                  temporary={temporary} 
                  settemporary={settemporary} 
                  activeMenu={activeMenu}
                  deletedtasks={deletedtasks}
                  setdeletedtasks={setdeletedtasks}
            />
          {
          activeMenu[5] && deletedtasks?
                <button className="historybutton" onClick={handleClear}>Clear History</button>

          :
          ''
        }
      </div>
      <input type="checkbox" id='rightmenubox'/>
      <label htmlFor="rightmenubox"><FontAwesomeIcon icon={faUser} className="rightbars" style={{backgroundColor:theme?'':'rgb(110, 11, 208)',color:theme?'':"white"}}/></label>
      <label htmlFor="rightmenubox" className="rightmenuclose"></label>
      <label className="rightmenu" htmlFor="rightmenubox">
        <RightMenu ToDoItems={ToDoItems} completed={completed} setcompleted={setcompleted} setToDoItems={setToDoItems} theme={theme} settheme={settheme} setimportant={setimportant} todaytasksnames={todaytasksnames} settodaytasksnames={settodaytasksnames} setdeletedtasks={setdeletedtasks} activeMenu={activeMenu}/>
      </label>

      {clear?<label className="background" onClick={handleClear}/>:''}
      {
        clear?
        <div className="deletemenu" style={{backgroundColor:theme?'#24203a':'',boxShadow:theme?'none':''}}>
            <div className="header">
              <label style={{color:theme?'white':''}}>Are you sure?</label>
              <label onClick={handleClear} name='close' className="close" style={{color:theme?'white':''}}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></label>
            </div>
            <p>History will be deleted permanantly</p>
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


export default App;