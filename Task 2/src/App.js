import React from "react";
import './index.css'
import Layout from './Layout.js';
import Timer from './components/Countdowntimer/Timer';
import Stopwatch from './components/stopwatch/Stopwatch'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Stopwatch/>}></Route>
          <Route path="/timer" element={<Timer/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;