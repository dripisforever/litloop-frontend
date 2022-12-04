import React from "react";
import BaseImage from "views/components/BaseImage";
import BaseCard from "views/components/BaseCard";
import { useSelector } from "react-redux";
import RouterLink from "views/components/RouterLink";
import ModalLink from "views/components/ModalLink";
import { makeStyles } from "@material-ui/styles";
import { selectors } from "core/reducers/index";
import BaseCardHeader from "views/components/BaseCardHeader";
import MovieRatingTag from "./MovieRatingTag";
import { getAspectRatioString } from "./AspectRatio";
import { useConfiguration } from "./ConfigurationProvider";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

function MovieCard({ movieId, subheader }) {
  const classes = useStyles();
  const movie = useSelector(state => selectors.selectMovie(state, movieId));
  const { getImageUrl } = useConfiguration();

  return (
    <ModalLink to={`/movies/${movieId}`}>

      {/*<RouterLink className={classes.link} to={`/movie/${movieId}`}>*/}

        <BaseCard hasActionArea>
          <BaseImage
            src={getImageUrl(movie.poster_path, { original: false })}
            alt={movie.title}
            aspectRatio={getAspectRatioString(2, 3)}
          />
          {/*<div style={{ position: "absolute", top: 0, left: 0 }}>
            <MovieRatingTag movieId={movieId} />
          </div>*/}
          {/*<BaseCardHeader title={movie.title} subheader={subheader} />*/}
          <BaseCardHeader  subheader={subheader} />
        </BaseCard>
      {/*</RouterLink>*/}
    </ModalLink>
  );
}

export default MovieCard;
