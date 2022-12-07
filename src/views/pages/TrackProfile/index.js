import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styled from "styled-components"

// MATERIAL UNDONE
import { Typography } from "@material-ui/core";

// VIEWS
import Profile from "views/components/Profile";
import TrackIntroduction from "./TrackIntroduction";
// import TrackImageGridList from "./TrackImageGridList";
// import TrackVideoList from "./TrackVideoList";
import TrackVideoRecommendations from "./TrackVideoRecommendations";
import VideoCard from "./VideoCard";
// import TrackCastGridList from "./TrackCastGridList";
import SimilarTracks from "./SimilarTracks";


// CORE
import { fetchTrack } from "core/actions";
import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";


// STYLING

const VideoWrapper = styled.div`

  /* display: flex; */

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: */
`;

const REQUIRED_FIELDS = ["tagline"];

function TrackProfile() {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingTrack(state, trackId)
  );
  const track = useSelector(state => selectors.selectTrack(state, trackId));

  useEffect(() => {
    dispatch(fetchTrack(trackId, REQUIRED_FIELDS));
  }, [trackId, dispatch]);

  const loading = isFetching || !verifyCachedData(track, REQUIRED_FIELDS);

  return (
    <Profile
      loading={loading}
      introduction={<TrackIntroduction trackId={trackId} />}
      main={
        <>

          <Typography variant="h6" gutterBottom>Videos</Typography>
          <VideoWrapper
            // className="DAMN"
            // style={`display: flex;`}
          >
            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/%40gudaniky%3Avideo%3A7033332221628992770.mp4"}/>
            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4"}/>
            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/%40yearboyl%3Avideo%3A7015198041556684038.mp4"}/>

            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/%40gudaniky%3Avideo%3A7033332221628992770.mp4"}/>
            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4"}/>
            <VideoCard url={"https://d1ca20q97pi6ei.cloudfront.net/%40yearboyl%3Avideo%3A7015198041556684038.mp4"}/>

            {/*<VideoCard url={"https://views-test-api.s3.us-west-1.amazonaws.com/%40gudaniky%3Avideo%3A7033332221628992770.mp4"}/>
            <VideoCard url={"https://views-test-api.s3.us-west-1.amazonaws.com/Crystal+Castles+-+Kerosene(American+Psycho).mp4"}/>
            <VideoCard url={"https://views-test-api.s3.us-west-1.amazonaws.com/%40yearboyl%3Avideo%3A7015198041556684038.mp4"}/>*/}


          </VideoWrapper>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <TrackVideoRecommendations trackId={trackId} />
        </>
      }

    />
  );
}

export default TrackProfile;
