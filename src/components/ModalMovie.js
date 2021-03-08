import React from 'react';
import BaseImage from "components/BaseImage";
import ModalMovieList from 'components/ModalMovieList';
import { getDirectorByMovieId, getMovieById } from '../data';
// import { ModalLink } from '../../../src';
// import  ModalLink  from 'components/ModalLink';
import  ModalLink  from './ModalLink';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Root = styled.div`
  padding: 12px;
`;

const ModalMovie = ({
  match: {
    params: { id }
  }
}) => {
  const movie = getMovieById(id);

  const director = getDirectorByMovieId(id);

  const otherMovies = director.movies.filter(movie => movie.id !== id);

  return (
    <Root>
      <Typography variant="h6">{movie.title}</Typography>
      {/*<BaseImage
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        aspectRatio={getAspectRatioString(2, 3)}
      />*/}
      <ModalLink to={`/directors/${director.id}`} style={{ fontSize: 14 }}>
        {director.name}
      </ModalLink>
      <hr />
      <p>Other movies by {director.name}:</p>
      <ModalMovieList movies={otherMovies} />
    </Root>
  );
};

// Movie.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string
//     })
//   }).isRequired
// };

export default ModalMovie;
