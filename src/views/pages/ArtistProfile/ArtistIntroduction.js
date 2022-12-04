import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "core/reducers/index";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import { getImdbProfileUrl } from "core/utils";
import Introduktion from "views/components/Introduktion";
import ImdbLogo from "views/components/ImdbLogo";

import BaseImage from "views/components/BaseImage";
// import { makeStyles, Box, Typography } from "@material-ui/core";
import { getAspectRatioString } from "views/components/AspectRatio";
import { useConfiguration } from "views/components/ConfigurationProvider";

const useStyles = makeStyles(theme => ({
  biography: {
    whiteSpace: "pre-wrap"
  }
}));

function ArtistIntroduction({ artistId }) {
  const artist = useSelector(state => selectors.selectArtist(state, artistId));
  const classes = useStyles();

  if (!artist) {
    return null;
  }

  return (
    <Introduktion
      imageSrc={
        <>
          <Box flexBasis={100}>
            <BaseImage
              src={artist.images[0] ? artist.images[0].url : ""}
              aspectRatio={getAspectRatioString(1, 1)}
            />
          </Box>
        </>
      }
      backgroundImageSrc={artist.images[0] ? artist.images[0].url : ""}
      title={artist.name}
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {/*<Link
                  href={getImdbProfileUrl(artist.imdb_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImdbLogo />
                </Link>*/}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Biography
              </Typography>
              <Typography className={classes.biography} variant="body2">
                {artist.biography}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default ArtistIntroduction;
