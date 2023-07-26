import React, { useState } from "react";
import './Layout.css'
import Footer from "./components/Footer/Footer";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const [stop,setstopwatch] = useState(true);
  const [timer,settimer] = useState(false);

  const changestopstate = () =>{
    setstopwatch(true);
    settimer(false);
  }


  const changetimerstate = () =>{
    setstopwatch(false);
    settimer(true);
  }

  return (
    <div className="navcontainer">

        <div className="itemcontent">
            <div className="links">
              <NavLink to='/' className={stop?"labels active":'labels'} onClick={changestopstate}><label >Stopwatch</label></NavLink>
              <NavLink  to='/timer' className={timer?"labels active":'labels'} onClick={changetimerstate}><label>Timer</label></NavLink>
            </div> 
            <div className="content">
                <Outlet/>
            </div>
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  );
}

export default Layout;
