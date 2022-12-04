import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "core/reducers/index";
import { Link } from "react-router-dom";
import { Typography, makeStyles, Box, Grid } from "@material-ui/core";
import Rating from "./Rating";
// import { getTrackReleaseYear, getImdbProfileUrl } from "core/utils";
import Introduktion from "views/components/Introduktion";
import ImdbLogo from "views/components/ImdbLogo";
import TrackGenreChip from "./TrackGenreChip";

import BaseImage from "views/components/BaseImage";
// import { makeStyles, Box, Typography } from "@material-ui/core";
import { getAspectRatioString } from "views/components/AspectRatio";
import { useConfiguration } from "views/components/ConfigurationProvider";

import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';
import Button from 'views/components/Button';
import LikeIcon from 'views/components/LikeIcon';
import {screenLargerThan} from "views/style/util"
// import { likePhoto, unLikePhoto } from '../../actions/photo';
import { fetchLikeTrack, fetchUnLikeTrack } from "core/actions";
import {
  primaryColor1,
  white,
  likeColor,
  greenColor,
} from 'views/style/colors';


const useStyles = makeStyles(theme => ({
  year: {
    color: theme.palette.text.secondary
  },
  tagline: {
    fontStyle: "italic"
  },
  genreChip: {
    margin: theme.spacing(0.5)
  },
  overview: {
    whiteSpace: "pre-wrap"
  }
}));


const LikedBtn = styled(Button)`
  display: flex;
  align-items: center;
  margin: 0;
  ${props =>
    props.likedByUser &&
    `
    background-color: ${likeColor};
    color: ${white};
    &:hover {
      color: ${white};
      border-color: transparent !important;
    }
  `};
  ${screenLargerThan.giant`
    flex-direction: column;
    height: auto;
    border: none;
    color: ${white} !important;
    background-color: transparent !important;
    svg {
      fill: ${white};
      color: ${white};
    }
    ${props =>
      props.likedByUser &&
      `
        svg {
          fill: ${likeColor};
          color: ${white};
        }
      `};
    &:hover {
      color: ${white};
    }
  `};
`;

const LikesCounter = styled.span`
  margin: 0px 6px;
`;


function TrackIntroduction({ trackId, handleLikePhoto, handleUnLikePhoto }) {
  const track = useSelector(state => selectors.selectTrack(state, trackId));
  const classes = useStyles();

  // const releaseYear = getTrackReleaseYear(track);

  if (!track) {
    return null;
  }
  const linkList = track.artists.map((artist) => {
    return (
      <li key={artist.id}>
        <Link
          to={`/artist/${artist.id}/`}
          style={{ color: '#FFF' }}
          >
          {artist.name}
        </Link>
      </li>
    );
  });

  return (
    <Introduktion
      backgroundImageSrc={track.album.images[0] ? track.album.images[0].url : ""}
      imageSrc={
        <>
          <Box flexBasis={100}>
            <BaseImage
              src={track.album.images[0] ? track.album.images[0].url : ""}
              aspectRatio={getAspectRatioString(1, 1)}
            />
          </Box>
        </>

      }
      title={
        <>
          <Typography variant="h5" gutterBottom={!track.tagline}>
            {track.name}  <br/>{track.artists.map((artist, i) =>
                <span key={i}>
                  {i > 0 && ", "}
                  <Link
                    to={`/artist/${artist.id}/`}
                    style={{
                      fontWeight: "bold",
                      color: '#FFF',
                      textDecoration: 'none',
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }}
                    >

                    {artist.name}
                  </Link>
                </span>
              )
            }

          </Typography>
          {track.tagline && (
            <Typography
              className={classes.tagline}
              color="textSecondary"
              gutterBottom
            >
              {`"${track.tagline}"`}
            </Typography>
          )}
        </>
      }
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {/*<Rating value={track.vote_average * 10} />
                <Box marginLeft={2}>
                  <Link
                    href={getImdbProfileUrl(track.imdb_id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImdbLogo />
                  </Link>
                </Box>*/}
                {/*{linkList}*/}
              </Box>
            </Grid>


          </Grid>
        </>
      }
      likeButton={
        <>
          <LikedBtn likedByUser={track.is_liked}
            onClick={() =>
              track.is_liked
                ? handleUnLikePhoto(track)
                : handleLikePhoto(track)
            }>
            <LikeIcon
              size={18}
              color={track.is_liked ? white : likeColor}
              hoverColor={track.is_liked ? white : likeColor}
            />
            <LikesCounter>{track.total_likes}</LikesCounter>
          </LikedBtn>
        </>
      }

    />
  );
}

// uploadButton={
//   <>
//     <LikedBtn
//       onClick={() =>
//         {/*handleuploadVideo()*/}
//
//       }>
//       <LikeIcon
//         size={18}
//
//       />
//       {/*<LikesCounter>{track.total_likes}</LikesCounter>*/}
//     </LikedBtn>
//   </>
// }
// export default TrackIntroduction;

export default withRouter(
  connect(
    null,
    {
      // handleLikePhoto: likePhoto,
      // handleUnLikePhoto: unLikePhoto,
      handleLikePhoto: fetchLikeTrack,
      handleUnLikePhoto: fetchUnLikeTrack,
      // onPush: push,
    }
  )(TrackIntroduction)
);
