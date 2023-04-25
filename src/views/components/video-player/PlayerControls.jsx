import React, { useState } from 'react';
import { ReactPlayerProps } from 'react-player';
// import { format } from 'date-fns';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import  styled  from 'styled-components';


// import PauseRounded from '@mui/icons-material/PauseRounded';
// import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import { Typography, IconButton, Grid, Slider } from '@mui/material';




// import { IconButton, Slider, Stack, styled, Typography } from '@mui/material/material';
import { StyledIconButton, StyledSlider, StyledStack, StyledTypography } from 'views/styledComponents';
import { StyledPauseIcon, StyledPlayArrowIcon, StyledVolumeUpIcon } from 'views/styledComponents/icons';
// import { FullscreenRounded, VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';

// import VolumeUp from "@mui/icons-material/VolumeUp";
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeMute from "@mui/icons-material/VolumeOff";
// import FullScreen from "@mui/icons-material/Fullscreen";

import { TbArrowsDiagonal } from 'react-icons/tb';
import { FiPlay } from 'react-icons/fi';
import { FiPause } from 'react-icons/fi';
import { FaVolumeUp } from 'react-icons/fa';

const StyledFullScreen = styled.div`
  display: flex;
`;

const DarkDivPlayToggle = styled.div`
  top: 0;
  position: absolute;
  color: red;
`;

const PlayAndSound = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlayerControlsBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledPlayerControls = styled.div`
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .video-player__slider {
    width: 100%;
    color: #fff;
    box-sizing: border-box;

    &--seek {
      /* margin-left: 12px; */
      /* margin-right: 12px; */
    }

    &--sound {
      width: 100px;
    }

    .MuiSlider-track {
      border: none;
    }

    .MuiSlider-thumb {
      background-color: #fff;

      &:before: {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      &:hover,
      &.Mui-focusVisible,
      &.Mui-active {
        box-shadow: none;
      }
    }
  }
`;

const ReStyledSlider = styled(StyledSlider)`
  transform: rotate(-90deg);
  position: relative;
  background-color: #ffffff1c;
  border-radius: 18px;
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;

`;

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


const StyledSliderz = () => {

  return (
    <WrapperDiv>
      <span rail></span>
      <span track></span>
      <StyledInput type="range" orient="vertical" />
    </WrapperDiv>
  )
}

const StyledSliderzUpd = styled(StyledSliderz)`


`;

const WrapperDiv = styled.div`


  bottom: 58px;
  left: 14em;
  position: absolute;
  background: #ffffff40;
  border-radius: 10px;

  input[type=range]::range-track {
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background-color: #eee;
    border: 2px solid #ccc;
  }

  input[type=range]::range-thumb {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: white;
    border: 2px solid #1976D2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  }

  input[type=range]::range-progress {
    height: 20px;
    border-radius: 10px 0 0 10px;
    background-color: #2196F3;
    border: 2px solid #1976D2;
  }
`;

const StyledInput = styled.input`
  -webkit-appearance: slider-vertical;
  appearance: slider-vertical;

  cursor: pointer;

  height: 80px;
  width: 20px;

  input[type="range"]::-moz-range-thumb {
    background-color: green;
  }

  ::-webkit-slider-thumb {
    background-color: green;
  }

  ::-moz-range-thumb {
    background-color: green;
  }
`;

const PlayerControls = (props, {doubleClickToggleFullScreen}) => {
  const { state, dispatch, wrapperRef, playerRef } = props;

  const handleSound = (_event, newValue) => {
    dispatch({ type: 'VOLUME', payload: newValue });
  };

  const handleFullscreen = () => {
    screenfull.toggle(findDOMNode(wrapperRef.current));
  };

  const handleSeek = (_event, newValue) => {
    playerRef.current.seekTo(newValue);
  };

  const renderSeekSlider = () => {
    return (
      <StyledSlider
        aria-label="Time"
        className={'video-player__slider video-player__slider--seek'}
        min={0}
        max={state.duration}
        step={0.01}
        value={state.progress.playedSeconds}
        onChange={handleSeek}
      />
    );
  };

  const renderPlayButton = () => {
    return (
      <StyledIconButton onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}>
        {state.playing ? (
          <FiPause sx={{ fontSize: '2rem', color: 'white' }} />
        ) : (
          <FiPlay sx={{ fontSize: '2rem', color: 'white' }} />
        )}
      </StyledIconButton>
    );
  };
  const [isShown, setIsShown] = useState(false);

  // const [data, setData] = useState(null)
  const [delayHandler, setDelayHandler] = useState(null)

  const handleMouseEnter = event => {
    setDelayHandler(setTimeout(() => {
      // const yourData = // whatever your data is


    }, 1500))
    setIsShown(true)
  }
  const handleMouseLeave = () => {
    setDelayHandler(setTimeout(() => {
      // const yourData = // whatever your data is
      setIsShown(false)

    }, 500))

    clearTimeout(delayHandler)
  }


  const renderSoundSlider = () => {
    return (
      <StyledGrid
        id="SLIDER-VOL"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // spacing={2}
        // direction="row"
        // sx={{ mb: 1, px: 1 }}
        // alignItems="center"
        >
        <StyledIconButton

        >
          <FaVolumeUp

            sx={{ fontSize: '1.5rem', color: 'white' }}
          />

        </StyledIconButton>
        {isShown && (
          <StyledSliderzUpd
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Volume"
            className={'video-player__slider video-player__slider--sound'}
            max={1}
            step={0.01}
            value={state.volume}
            onChange={handleSound}
          />
        )}

      </StyledGrid>
    );
  };

  // const renderDurationText = () => {
  //   return (
  //     <Grid spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
  //       <Typography variant="body2" color="white">
  //         {format(new Date(state.progress.playedSeconds * 1000), 'mm:ss')}
  //         {' / '}
  //         {format(new Date(state.duration * 1000), 'mm:ss')}
  //       </Typography>
  //     </Grid>
  //   );
  // };

  // const renderFullscreenButton = () => {
  //   return (
  //     <IconButton onClick={handleFullscreen}>
  //       <FullScreen sx={{ fontSize: '2rem', color: 'white' }} />
  //     </IconButton>
  //   );
  // };

  const renderFullscreenButton = () => {
    return (
      <StyledGrid>
        <StyledIconButton onClick={handleFullscreen}>
          <TbArrowsDiagonal fontSize="medium" />
        </StyledIconButton>
      </StyledGrid>
    );
  };

  return (
    <StyledPlayerControls className={'video-player__controls'}>
      <DarkDivPlayToggle onClick={doubleClickToggleFullScreen} />
      <div direction="row" alignItems="center">
        {renderSeekSlider()}
      </div>
      <StyledPlayerControlsBottom>
        <PlayAndSound >
          {renderPlayButton()}
          {/*{renderDurationText()}*/}
        </PlayAndSound>


        <StyledFullScreen>
          {renderSoundSlider()}
          {renderFullscreenButton()}
        </StyledFullScreen>
      </StyledPlayerControlsBottom>
    </StyledPlayerControls>
  );
};

export default PlayerControls;
