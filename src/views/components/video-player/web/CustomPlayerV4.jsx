// REFERENCE: https://voskan.host/2023/03/26/how-to-create-a-custom-video-player-in-react-js/

import React, { useRef, useState, useEffect } from 'react';
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaClosedCaptioning,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';
import { BsArrowRepeat } from 'react-icons/bs';
import styled from 'styled-components';
import HLS from 'hls.js';

import './video-player.css';
import Slider from './slider/Slider';

const DisplayDiv = styled.div`
  display: flex;
`;
const Overlay = styled.div`
  position: absolute;
`;

const StyledSlider = styled(Slider)`
  position: absolute;
  bottom: 18px;
`;
const OverlayPlayButton = styled.div`

  position: absolute;
  z-index: 100;
  width: 400px;
  height: 176px;
`;
const PlayButton = styled.button`
  /* cursor: pointer; */
  margin-left: 10px;
`;

const CustomPlayerV4 = ({ url, light, viewsCount, likesCount }, props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);

  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);


  const [percentage, setPercentage] = useState(0)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioRef = useRef()
  const wrapperRef = useRef(null);

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

  const onChange = (e) => {
    const video = videoRef.current
    video.currentTime = (video.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const play = () => {
    const video = videoRef.current
    video.volume = 0.1

    if (!isPlaying) {
      setIsPlaying(true)
      video.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      video.pause()
    }
  }

  const handleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };


  const handleFullScreen = () => {
    if (!isFullScreen) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }

  // useEffect(() => {
  //   const video = videoRef.current;
  //   const videoUrl = url
  //   let hls;
  //   if (HLS.isSupported()) {
  //     hls = new HLS();
  //     hls.loadSource(videoUrl);
  //     hls.attachMedia(video);
  //   } else {
  //
  //     video.src = videoUrl;
  //     video.type = 'video/mp4';
  //     // addSourceToVideo(video, videoSrcInMp4, 'video/mp4');
  //     video.play();
  //   }
  //
  //   function addSourceToVideo(element, src, type) {
  //     var source = document.createElement('source');
  //     source.src = src;
  //     source.type = type;
  //     element.appendChild(source);
  //   }
  //   return () => hls && hls.destroy();
  // }, [url]);

  return (
    <div className="video-player" ref={videoContainerRef}>
      <Overlay>
        <OverlayPlayButton onClick={handlePlayPause}>

        </OverlayPlayButton>
      </Overlay>
      <video
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}

        src={url}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))
        }}
      >

      </video>
      <DisplayDiv>


        <div className="controls">

          <Slider
            className
            percentage={percentage}
            onChange={onChange}
            style={{
              position: 'absolute',
              bottom: '18px'
            }}
          />
          <PlayButton onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</PlayButton>
          <div className="duration">
            {format((currentTime ), 'mm:ss')}
            {' / '}
            {format((duration ), 'mm:ss')}
          </div>

          <button>{volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}</button>
          {/*<input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />*/}
          <button onClick={handleFullScreen}>{isFullScreen ? <FaCompress /> : <FaExpand />}</button>
        </div>
      </DisplayDiv>
    </div>
  );
};
export default CustomPlayerV4
