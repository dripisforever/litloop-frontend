import React, {useEffect} from "react";
import { useSelector } from "react-redux";


// MATERIAL DONE
// import { Typography, Box, Grid, Link, makeStyles } from "@mui/material";
import { StyledTypography, StyledBox, StyledGrid, StyledLink } from 'views/styledComponents';

import BaseImageV2 from "views/components/BaseImageV2";
import BaseCard from "views/components/BaseCard";
import CustomPlayerV4 from "views/components/video-player/web/CustomPlayerV4";

// import Rating from "./Rating";
import Introduction from "views/components/Introduction";
import ImdbLogo from "views/components/ImdbLogo";
// import MovieGenreChip from "./MovieGenreChip";

import { selectors } from "core/reducers/index";
import { getMovieReleaseYear, getImdbProfileUrl } from "core/utils";
import { getAspectRatioString } from "views/components/AspectRatio";
import { useConfiguration } from "views/components/ConfigurationProvider";


function VideoIntroduction({ videoId, obj, url }) {
// function MovieIntroductionV2({ movieId }) {
  // const video = useSelector(state => selectors.selectVideo(state, videoId));
  // const classes = useStyles();
  const { getImageUrl } = useConfiguration();
  // const releaseYear = getMovieReleaseYear(video);

  // if (!video) {
  //   return null;
  // }


  // useEffect(() => {
  //   // obj && document.title = obj.title;
  //   document.title = obj.title;
  // }, [])

  return (
    <div>
      <StyledTypography color="#00a0b0">
        {/*{video.title}*/}
      </StyledTypography>

      {/*<img src={movie.poster_path} />*/}
      {/*<StyledBox display="flex">*/}

        {/*<BaseImageV2
          src={getImageUrl(video.poster_path)}
          aspectRatio={getAspectRatioString(2, 3)}
          width={20}
        />*/}

        <CustomPlayerV4
          url={url}
        />

        {/*<a target="_blank" href={`https://rezka.ag/search/?q=${movie.title}&do=search&subaction=search`}>rezka</a>*/}
      {/*</StyledBox>*/}
      <StyledBox display="flex" alignItems="center">

        <StyledBox marginLeft={2} display="flex">

          {/*<Rating value={movie.vote_average * 10} />*/}


        </StyledBox>
      </StyledBox>
    </div>

  );
}

export default VideoIntroduction;
