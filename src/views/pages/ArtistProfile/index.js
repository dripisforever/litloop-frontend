import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtist } from "core/actions";
import { useParams } from "react-router-dom";
import Profile from "views/components/Profile";
import ArtistInfo from "./ArtistInfo";
import ArtistIntroduction from "./ArtistIntroduction";
import ArtistImageGridList from "./ArtistImageGridList";
import ArtistCastingGridList from "./ArtistCastingGridList";

import ArtistAlbums from "./ArtistAlbums";

import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";

const REQUIRED_FIELDS = ["biography", "imdb_id"];

function ArtistProfile() {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingArtist(state, artistId)
  );
  const artist = useSelector(state => selectors.selectArtist(state, artistId));

  useEffect(() => {
    dispatch(fetchArtist(artistId, REQUIRED_FIELDS));
  }, [artistId, dispatch]);

  const loading = isFetching || !verifyCachedData(artist, REQUIRED_FIELDS);

  return (
    <Profile
      loading={loading}
      introduction={<ArtistIntroduction artistId={artistId} />}
      leftSide={
        <>
          <Typography variant="h6" gutterBottom>
            Artistal Info
          </Typography>
          <ArtistInfo artistId={artistId} />
        </>
      }
      main={
        <>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>


          <Typography variant="h6" gutterBottom>
            Albums
          </Typography>
          <ArtistAlbums artistId={artistId}/>
        </>
      }
    />
  );
}

export default ArtistProfile;
