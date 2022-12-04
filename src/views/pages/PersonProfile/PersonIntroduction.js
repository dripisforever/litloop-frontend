import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "core/reducers/index";
import { Typography, makeStyles, Box, Grid, Link } from "@material-ui/core";
import { getImdbProfileUrl } from "core/utils";
import Introduction from "views/components/Introduction";
import ImdbLogo from "views/components/ImdbLogo";

const useStyles = makeStyles(theme => ({
  biography: {
    whiteSpace: "pre-wrap"
  }
}));

function PersonIntroduction({ personId }) {
  const person = useSelector(state => selectors.selectPerson(state, personId));
  const classes = useStyles();

  if (!person) {
    return null;
  }

  return (
    <Introduction
      imageSrc={person.profile_path}
      backgroundImageSrc={person.profile_path}
      title={person.name}
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Link
                  href={getImdbProfileUrl(person.imdb_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImdbLogo />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Biography
              </Typography>
              <Typography className={classes.biography} variant="body2">
                {person.biography}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default PersonIntroduction;
