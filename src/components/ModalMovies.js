import React from 'react';
import ModalMovieList from './ModalMovieList';
import PopularMovies from '../pages/PopularMovies';
import { getAllMovies } from '../data';

const ModalMovies = () => {
  const movies = getAllMovies();

  return (
    <React.Fragment>
      
      {/*<ModalMovieList movies={movies} />*/}
      {/*<ModalPopularMovies movies={movies} />*/}
      <PopularMovies />
    </React.Fragment>
  );
};

export default ModalMovies;
