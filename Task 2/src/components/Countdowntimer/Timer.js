import React, { useState, useEffect, useRef } from "react"
import './Timer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretUp, faCaretDown, faPlay,faSquare, faPause,faRotateForward} from '@fortawesome/free-solid-svg-icons';
import NewTimer from "./NewTimer";


function SetTime(){
    const [seconds,setseconds] = useState(0);
    const [minutes,setminutes] = useState(0);
    const [hours,sethours] = useState(0);
    const [days,setdays] = useState(0);

    const childRef = useRef(null);


    const [isstarted,setisstarted] = useState(false);
    const [ispaused, setispaused] = useState(false);
    const [isReset, setisReset] = useState(false);
    const [iscompleted,setiscompleted] = useState(false);


    
    const handleStart = () =>{
        if(isstarted===false){
          setisstarted(!isstarted)
          setisReset(!isReset)
        }
        else if(isstarted===true && ispaused===false)
          setispaused(!ispaused)
        else
          setispaused(!ispaused)
    }

    const handleReset = () => {
        setisReset(!isReset)
        setispaused(false)
        setisstarted(false)
        setseconds(seconds)
        sethours(hours)
        setminutes(minutes)
        setdays(days)
        setiscompleted(false);
    }

    const handleRestart=() => {
        setiscompleted(false)
        childRef.current.assignvalues();
    }



    useEffect(() => {
        const handledayScroll = (event) => {
          const { deltaY } = event;
          if (deltaY > 0) {
            increasedays();
          } else if (deltaY < 0) {
            decreasedays();
          }
        };

        const handlehourScroll = (event) => {
            const { deltaY } = event;
            if (deltaY > 0) {
              increasehours();
            } else if (deltaY < 0) {
              decreasehours();
            }
          };

        const handleminuteScroll = (event) => {
            const { deltaY } = event;
            if (deltaY > 0) {
              increaseminutes();
            } else if (deltaY < 0) {
              decreaseminutes();
            }
          };

        const handlesecondScroll = (event) => {

        const { deltaY } = event;
        if (deltaY > 0) {
            increaseseconds();
        } else if (deltaY < 0) {
            decreaseseconds();
        }
        };
    
        const daysscroll = document.getElementById('days');
        daysscroll.addEventListener('wheel', handledayScroll);

        const hoursscroll = document.getElementById('hours');
        hoursscroll.addEventListener('wheel', handlehourScroll);
    
        const minutesscroll = document.getElementById('minutes');
        minutesscroll.addEventListener('wheel', handleminuteScroll);

        const secondsscroll = document.getElementById('seconds');
        secondsscroll.addEventListener('wheel', handlesecondScroll);
        return () => {
            daysscroll.removeEventListener('wheel', handledayScroll);
            hoursscroll.removeEventListener('wheel', handlehourScroll);
            minutesscroll.removeEventListener('wheel', handleminuteScroll);
            secondsscroll.removeEventListener('wheel', handlesecondScroll);
        };
      }, [days,hours, minutes, seconds]);




    
    
    const increasedays = () => {
        setdays((days + 1) % 100);

    };
  
    const decreasedays = () => {
      setdays(days - 1 >= 0 ? days - 1 : 99 - days);
    };

    
    const increasehours = () =>{
        sethours((hours+1)%24)
    }

    const decreasehours = () =>{
        sethours(hours-1>=0?hours-1:23-hours)
    }

    const increaseminutes = () =>{
        setminutes((minutes+1)%60)
    }

    const decreaseminutes = () =>{
        setminutes(minutes-1>=0?minutes-1:59-minutes)
    }

    const increaseseconds = () =>{
        setseconds((seconds+1)%60)
    }

    const decreaseseconds = () =>{
        setseconds(seconds-1>=0?seconds-1:59-seconds)
    }

    return(
        <div className="maincontainer">
            {
                isstarted?
                    <NewTimer seconds={seconds} minutes={minutes} hours={hours} days={days} isstarted={isstarted} ispaused={ispaused} iscompleted={iscompleted} setiscompleted={setiscompleted} handleRestart={handleRestart} ref={childRef}/>
                :
                <div className="timesetter" style={isstarted?{display:"none"}:{}}>
                    <div className="days layout" >
                        <h2 className="headings">Days</h2>
                        <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={increasedays}></FontAwesomeIcon>
                        <div className="numbers" onScroll={increasedays} id='days'>
                            <h1 className="numberfirst">{String('0'+(days-2>=0?days-2:days===0?98:100-days)).slice(-2)}</h1>
                            <h1 className="numberup">{String('0'+(days-1>=0?days-1:99-days)).slice(-2)}</h1>
                            <h1 className="numbermiddle" id='daym'>{String('0'+days).slice(-2)}</h1>
                            <h1 className="numberdown">{String('0'+(days+1)%100).slice(-2)}</h1>
                            <h1 className="numberlast">{String('0'+(days+2)%100).slice(-2)}</h1>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={decreasedays}></FontAwesomeIcon>            
                    </div>

                    <div className="hours layout" >
                        <h2 className="headings">Hours</h2>
                        <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={increasehours}></FontAwesomeIcon>
                        <div className="numbers" id='hours'>
                            <h1 className="numberfirst">{String('0'+(hours-2>=0?hours-2:hours===0?22:24-hours)).slice(-2)}</h1>
                            <h1 className="numberup">{String('0'+(hours-1>=0?hours-1:23-hours)).slice(-2)}</h1>
                            <h1 className="numbermiddle">{String('0'+hours).slice(-2)}</h1>
                            <h1 className="numberdown">{String('0'+(hours+1)%24).slice(-2)}</h1>
                            <h1 className="numberlast">{String('0'+(hours+2)%24).slice(-2)}</h1>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={decreasehours}></FontAwesomeIcon>            
                    </div>

                    <div className="minutes layout" >
                        <h2 className="headings">Minutes</h2>
                        <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={increaseminutes}></FontAwesomeIcon>
                        <div className="numbers" id='minutes'>
                            <h1 className="numberfirst">{String('0'+(minutes-2>=0?minutes-2:minutes===0?58:60-minutes)).slice(-2)}</h1>
                            <h1 className="numberup">{String('0'+(minutes-1>=0?minutes-1:59-minutes)).slice(-2)}</h1>
                            <h1 className="numbermiddle">{String('0'+minutes).slice(-2)}</h1>
                            <h1 className="numberdown">{String('0'+(minutes+1)%60).slice(-2)}</h1>
                            <h1 className="numberlast">{String('0'+(minutes+2)%60).slice(-2)}</h1>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={decreaseminutes}></FontAwesomeIcon>            
                    </div>

                    <div className="seconds layout" >
                        <h2 className="headings">Seconds</h2>
                        <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={increaseseconds}></FontAwesomeIcon>
                        <div className="numbers" id='seconds'>
                            <h1 className="numberfirst">{String('0'+(seconds-2>=0?seconds-2:seconds===0?58:60-seconds)).slice(-2)}</h1>
                            <h1 className="numberup">{String('0'+(seconds-1>=0?seconds-1:59-seconds)).slice(-2)}</h1>
                            <h1 className="numbermiddle">{String('0'+seconds).slice(-2)}</h1>
                            <h1 className="numberdown">{String('0'+(seconds+1)%60).slice(-2)}</h1>
                            <h1 className="numberlast">{String('0'+(seconds+2)%60).slice(-2)}</h1>
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={decreaseseconds}></FontAwesomeIcon>            
                    </div>
                </div>
            }
            <div className="starticon">
                {isstarted?
                    <div className="startedbuttons">
                        <button  className="playbutton reset" onClick={handleReset}>Stop</button>
                        {
                            iscompleted?
                            <button className="playbutton reset" onClick={handleRestart}>Reset</button>
                            :
                            <button className="playbutton reset" onClick={handleStart}>{ispaused? 'Resume':'Pause'}</button>

                        }
                    </div>
                    :
                    <button className="playbutton" onClick={handleStart}>Start</button>
                }
            </div>
        </div>
    )
}

export default SetTime;