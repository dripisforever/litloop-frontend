import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectors } from "core/reducers/index";
import { Typography, makeStyles, Box, Grid } from "@material-ui/core";
// import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import Rating from "./Rating";
// import { getAlbumReleaseYear, getImdbProfileUrl } from "core/utils";
import Introduktion from "views/components/Introduktion";
import ImdbLogo from "views/components/ImdbLogo";
import AlbumGenreChip from "./AlbumGenreChip";

import useDocumentTitle from "views/components/useDocumentTitle"

import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';
import Button from 'views/components/Button';
import LikeIcon from 'views/components/LikeIcon';
import {screenLargerThan} from "views/style/util"
// import { likePhoto, unLikePhoto } from '../../actions/photo';
import { fetchLikeAlbum, fetchUnLikeAlbum } from "core/actions";
import {
  primaryColor1,
  white,
  likeColor,
  greenColor,
} from 'views/style/colors';


import BaseImage from "views/components/BaseImage";
// import { makeStyles, Box, Typography } from "@material-ui/core";
import { getAspectRatioString } from "views/components/AspectRatio";
import { useConfiguration } from "views/components/ConfigurationProvider";

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


function AlbumIntroduction({ albumId, handleLikePhoto, handleUnLikePhoto }) {
  const album = useSelector(state => selectors.selectAlbum(state, albumId));
  const classes = useStyles();

  function intersperse(arr, sep) {
      if (arr.length === 0) {
          return [];
      }

      return arr.slice(1).reduce(function(xs, x, i) {
          return xs.concat([sep, x]);
      }, [arr[0]]);
  }

  // var artistz = album.artists.map((artist, i) =>
  //     return (
  //       <Tag key={i} tag={item.tags[i]} />
  //     )
  //     return (
  //       <Link
  //         key={artist.id}
  //         to={`/artist/${artist.id}/`}
  //         style={{
  //           fontWeight: "bold",
  //           color: '#FFF',
  //           textDecoration: 'none',
  //           "&:hover": {
  //             textDecoration: "underline"
  //           }
  //         }}
  //         >
  //         {artist.name}, {'       '}
  //         {/*{artist.name.join(", ")} -{" "}*/}
  //       </Link>
  //     )
  // };
  // artistz = intersperse(artistz, ", ");

  // const releaseYear = getAlbumReleaseYear(album);

  // function handleLoadMore() {
  //   dispatch(fetchPopularMovies(nextPage));
  // }
  // const artists_title = album.artists.map((artist) => {
  //   artist.name+", "
  // })

  // useDocumentTitle(`${album.name} by `)
  // const title_name = album.name
  // useEffect(() => {
  //   document.title = title_name;
  // }, [title_name]);
  //
  if (!album) {
    return null;
  }

  // const trackList = album.tracks.items.map((track) => {
  //   return (
  //     <li key={track.id}>
  //       <Link
  //         to={`/track/${track.track_uri}/`}
  //         style={{ color: '#FFF' }}
  //         >
  //         {track.name}
  //         {track.artists.map(artist => {
  //           artist.name
  //         })}
  //       </Link>
  //     </li>
  //   );
  // });
  const linkList = album.artists.map((artist) => {
    return (
      // <li key={artist.id}>
        <Link
          key={artist.id}
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
          {artist.name}, {'       '}
          {/*{artist.name.join(", ")} -{" "}*/}
        </Link>
      // </li>
    );
  }).join();


  return (
    <Introduktion
      backgroundImageSrc={album.images[0] ? album.images[0].url : ""}
      imageSrc={
        <>
          <Box flexBasis={500}>
            <BaseImage
              src={album.images[0] ? album.images[0].url : ""}
              aspectRatio={getAspectRatioString(1, 1)}
            />
          </Box>
        </>
      }
      title={
        <>
          <Typography variant="h5" gutterBottom={!album.tagline}>
            {album.name} by {album.artists.map((artist, i) =>
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
            {/*{linkList}*/}


          </Typography>
          {album.tagline && (
            <Typography
              className={classes.tagline}
              color="textSecondary"
              gutterBottom
            >
              {`"${album.tagline}"`}
            </Typography>
          )}
        </>
      }
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {/*<Rating value={album.vote_average * 10} />
                <Box marginLeft={2}>
                  <Link
                    href={getImdbProfileUrl(album.imdb_id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImdbLogo />
                  </Link>
                </Box>*/}
                {/*{linkList}*/}

                {/*<ul>{trackList}</ul>*/}
                {/*<Link
                  to={`/artist/${album.artists[0].artist_uri}`}

                  >
                  {
                    album.artists[0].name}
                </Link>*/}
              </Box>
            </Grid>


          </Grid>
        </>
      }
      likeButton={
        <>
          <LikedBtn likedByUser={album.is_liked}
            onClick={() =>
              album.is_liked
                ? handleUnLikePhoto(album)
                : handleLikePhoto(album)
            }>
            <LikeIcon
              size={18}
              color={album.is_liked ? white : likeColor}
              hoverColor={album.is_liked ? white : likeColor}
            />
            <LikesCounter>{album.total_likes}</LikesCounter>
          </LikedBtn>
        </>
      }
    />
  );
}

// export default AlbumIntroduction;

export default withRouter(
  connect(
    null,
    {
      // handleLikePhoto: likePhoto,
      // handleUnLikePhoto: unLikePhoto,
      handleLikePhoto: fetchLikeAlbum,
      handleUnLikePhoto: fetchUnLikeAlbum,
      // onPush: push,
    }
  )(AlbumIntroduction)
);
