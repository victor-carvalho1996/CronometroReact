import React, { useEffect, useState } from 'react';
import './index.css'

function Cronometro() {
  const [currentSeconds, setSecond] = useState(0);
  const [minutes, setMinute] = useState(0);
  const [hours, setHour] = useState(0);
  const [enable, setEnable] = useState(false);


    function changeButton() {
        setEnable(!enable);
    }

    function resetTime() {
        setEnable(false);
        setSecond(0);
        setMinute(0)
        setHour(0);
    }

    useEffect(() => {
        let seconds = null;
        if(enable) {
            seconds = setInterval(() => {
               setSecond(currentSecond => currentSecond + 1);
               let secondsAux = currentSeconds
               if(currentSeconds === 59) {
                    setMinute(minutes => minutes + 1);
                    setSecond(0);
               }

               if(minutes === 59 && secondsAux === 59) {
                    setHour(hours => hours + 1);
                    setMinute(0);
               }
            }, 1000);
        }else if (!enable && seconds !== 0) {
            clearInterval(seconds);
        }
        return () => clearInterval(seconds);
    },[enable, currentSeconds, minutes]);

    return <div className='centerTimer'>
                <div className='timer'>
                    <div>{hours}</div>
                    <div>:</div>
                    <div>{minutes}</div>
                    <div>:</div>
                    <div>{currentSeconds}</div>
                </div>
                <div >
                    <button className={'buttonStyle '.concat(enable ? 'buttonRed' : 'buttonGreen')} onClick={changeButton}>{enable ? 'Pause' : 'Play'}</button>
                    <button className='buttonStyle' onClick={resetTime}>Reset</button>
                </div>
           </div> 
    
}

export default Cronometro;