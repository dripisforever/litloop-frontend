import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer() {
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = e => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = state => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="YOUR_VIDEO_URL_HERE"
        controls
        onProgress={handleProgress}
      />
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
    </div>
  );
}

export default VideoPlayer;
