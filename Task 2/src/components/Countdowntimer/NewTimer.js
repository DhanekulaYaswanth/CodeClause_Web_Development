import React, {useState, useEffect, useImperativeHandle, forwardRef} from "react";
import './NewTimer.css';
import FlipNumbers from "react-flip-numbers";



const NewTimer = forwardRef((props,ref) =>{
    const width =20;
    const height=30;

    const {iscompleted,setiscompleted} = props

    const {isstarted,ispaused} = props
    const [seconds,setSeconds] = useState(props.seconds);
    const [minutes,setMinutes] = useState(props.minutes);
    const [hours,setHours] = useState(props.hours);
    const [days,setDays] = useState(props.days);
    const [progressbarwidth,setprogressbarWidth] = useState(100);
    const [color,setcolor] = useState(['blue','rgb(170, 0, 255)']);
    



    const totalSeconds = props.days * 24 * 60 * 60 + props.hours * 60 * 60 + props.minutes * 60 + props.seconds;

    const [timeleft,settimeleft] = useState(totalSeconds);

    useImperativeHandle(ref, () => ({
      assignvalues(){
        setSeconds(props.seconds);
        setMinutes(props.minutes);
        setHours(props.hours);
        setDays(props.days);
        setprogressbarWidth(100);
        settimeleft(totalSeconds);
        setcolor(['blue','rgb(170, 0, 255)']);
      },
    }))
    
    

    useEffect(() => {
        let interval = null;
        if (isstarted && !ispaused) {
          interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
              if (minutes > 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
              } else {
                if (hours > 0) {
                  setHours((prevHours) => prevHours - 1);
                  setMinutes(59);
                  setSeconds(59);
                } else {
                  if (days > 0) {
                    setDays((prevDays) => prevDays - 1);
                    setHours(23);
                    setMinutes(59);
                    setSeconds(59);
                  }
                }
              }
            }

            if(seconds===0 && minutes===0 && hours===0 && days===0){
                setiscompleted(true)
                setprogressbarWidth(0)
            }

            if (timeleft > 0) {
              setprogressbarWidth( ((timeleft - 1) / totalSeconds) * 100);
              settimeleft((prevTimeleft) => prevTimeleft - 1);
            }
      
            if (timeleft <= totalSeconds / 2) {
              setcolor(['orange', 'rgb(170, 0, 255)']);
            }
            if (timeleft <= totalSeconds / 4) {
              setcolor(['red', 'rgb(170, 0, 255)']);
            }
            const transitionDuration = Math.sqrt(progressbarwidth) + "s";
          }, 1000);
        } else {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isstarted, ispaused, seconds, minutes, hours, days, timeleft]);
      
    
      
    

    return(
        <div  className="startingtimer">
                    <h1 className="newtimer">

                        <div className="countdownlabels">
                            <p>{days===1?"Day":"Days"} </p>
                            <p className="countdownnumbers" style={{color:color[0]}}><p>{`${String("0" + days).slice(-2)}`}</p></p>
                            <h1 className="colon colon1" style={{color:color[0]}}>:</h1>
                        </div>

                        
                        <div className="countdownlabels">
                            <p>{hours===1?"Hour":"Hours"}</p>
                            <p className="countdownnumbers" style={{color:color[0]}}><p>{`${String("0" + hours).slice(-2)}`}</p></p> 
                            <h1 className="colon colon2" style={{color:color[0]}}>:</h1>
                        </div>


                        <div className="countdownlabels">
                            <p>{minutes===1?"Minute":"Minutes"}</p>
                            <p className="countdownnumbers" style={{color:color[0]}}><p>{`${String("0" + minutes).slice(-2)}`}</p></p>
                          <h1 className="colon colon3" style={{color:color[0]}}>:</h1>
                        </div>


                        <div className="countdownlabels">
                            <p>{seconds===1?"Second":"Seconds"} </p>
                            
                            <p className="countdownnumbers" style={{color:color[0]}}><p>{`${String("0" + seconds).slice(-2)}`} </p></p>
                        </div>
                    </h1>
            <div className="progressbar">
                <span className="progressbarindicator" id="progressbar" style={{width:`${progressbarwidth}%`, backgroundImage:`linear-gradient(to right,${color[0]},${color[1]}`}}> </span>
            </div>
        </div>
    )
});

export default NewTimer;