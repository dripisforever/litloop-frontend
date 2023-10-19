import React, { useState, useRef } from 'react'
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import  styled  from 'styled-components';

import Button from './Button'
import './control-panel.css'
import { FullScreen, useFullScreenHandle  } from "react-full-screen";


function ControlPanel({ play, isPlaying, duration, currentTime, wrapperRef }) {

  const handle = useFullScreenHandle();

  function secondsToHms(seconds) {
    if (!seconds) return '00m 00s'

    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
      sec = `0${sec}`
    }
    if (min < 10) {
      min = `0${min}`
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    } else if (min == 0) {
      return `00m ${sec}s`
    } else {
      return `${min}m ${sec}s`
    }
  }

  const format = (seconds) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleFullscreen = () => {
    screenfull.toggle(findDOMNode(wrapperRef.current));
  };

  const renderFullscreenButton = () => {
    return (
      <div onClick={handleFullscreen}>
        <FullScreen  />
      </div>
    );
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef(null);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className='control-panel'>
      <Button play={play} isPlaying={isPlaying} />


      {format((currentTime ), 'mm:ss')}
      {' / '}
      {format((duration ), 'mm:ss')}

      <div>


        {/* <button onClick={handleFullscreen}>
         fullscreen
        </button>*/}

        
        {/* <FullScreen handle={handle}>
          content here
        </FullScreen>*/}

      </div>
    </div>
  )
}
export default ControlPanel
