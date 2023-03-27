import React from "react";
import { useSelector } from "react-redux";


// MATERIAL DONE
// import { Typography, Box, Grid, Link, makeStyles } from "@mui/material";
import { StyledTypography, StyledBox, StyledGrid, StyledLink } from 'views/styledComponents';

import BaseImageV2 from "views/components/BaseImageV2";
import BaseCard from "views/components/BaseCard";

import Rating from "./Rating";
import Introduction from "views/components/Introduction";
import ImdbLogo from "views/components/ImdbLogo";
import MovieGenreChip from "./MovieGenreChip";

import { selectors } from "core/reducers/index";
import { getMovieReleaseYear, getImdbProfileUrl } from "core/utils";
import { getAspectRatioString } from "views/components/AspectRatio";
import { useConfiguration } from "views/components/ConfigurationProvider";


function MovieIntroductionV2({ movieId }) {
  const movie = useSelector(state => selectors.selectMovie(state, movieId));
  // const classes = useStyles();
  const { getImageUrl } = useConfiguration();
  const releaseYear = getMovieReleaseYear(movie);

  if (!movie) {
    return null;
  }

  // const linkList = album.artists.map((artist) => {
  //   return (
  //     // <li key={artist.id}>
  //       <Link
  //         // key={.id}
  //         to={`/person/${artist.artist_uri}/`}
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
  //       </Link>
  //     // </li>
  //   );
  // });

  return (
    <div>
      <StyledTypography>{movie.title}</StyledTypography>
      {/*<img src={movie.poster_path} />*/}
      <BaseImageV2
        src={getImageUrl(movie.poster_path)}
        aspectRatio={getAspectRatioString(2, 3)}
      />
    </div>

  );
}

export default MovieIntroductionV2;
