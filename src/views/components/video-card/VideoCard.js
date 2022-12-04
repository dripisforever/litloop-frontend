<div
  onMouseMove={handleMouseMove}
  onMouseLeave={hanldeMouseLeave}
  ref={playerContainerRef}
  className={classes.playerWrapper}
>
  <ReactPlayer
    ref={playerRef}
    width="100%"
    height="100%"
    // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    url={m3u8_url}
    pip={pip}
    playing={playing}
    controls={false}
    light={light}
    loop={loop}
    playbackRate={playbackRate}
    volume={volume}
    muted={muted}
    onProgress={handleProgress}
    config={{
      file: {
        attributes: {
          crossorigin: "anonymous",
        },
      },
    }}
  />

  <Controls
    ref={controlsRef}
    onSeek={handleSeekChange}
    onSeekMouseDown={handleSeekMouseDown}
    onSeekMouseUp={handleSeekMouseUp}
    onDuration={handleDuration}
    onRewind={handleRewind}
    onPlayPause={handlePlayPause}
    onFastForward={handleFastForward}
    playing={playing}
    played={played}
    elapsedTime={elapsedTime}
    totalDuration={totalDuration}
    onMute={hanldeMute}
    muted={muted}
    onVolumeChange={handleVolumeChange}
    onVolumeSeekDown={handleVolumeSeekDown}
    onChangeDispayFormat={handleDisplayFormat}
    playbackRate={playbackRate}
    onPlaybackRateChange={handlePlaybackRate}
    onToggleFullScreen={toggleFullScreen}
    volume={volume}
    onBookmark={addBookmark}
  />

</div>
