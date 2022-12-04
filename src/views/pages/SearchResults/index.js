import React, { useEffect } from "react";
import useQueryString from "core/hooks/useQueryString";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMovieSearch, fetchPersonSearch, fetchArtistSearch, fetchTrackSearch, fetchAlbumSearch } from "core/actions";
import { DEFAULT_FIRST_PAGE } from "core/reducers/higherOrderReducers/createPagination";
import { selectors } from "core/reducers/index";
import useHistoryPush from "core/hooks/useHistoryPush";
import { useParams, useLocation } from "react-router-dom";
import SearchResultsHeader from "./SearchResultsHeader";
import MovieSearchResults from "./MovieSearchResults";
import PersonSearchResults from "./PersonSearchResults";
import ArtistSearchResults from "./ArtistSearchResults";
import AlbumSearchResults from "./AlbumSearchResults";
import TrackSearchResults from "./TrackSearchResults";

function SearchResults() {
  const { query } = useQueryString();
  const { search } = useLocation();
  const { searchType } = useParams();
  const historyPush = useHistoryPush();
  const dispatch = useDispatch();

  const totalMovieCount = useSelector(state =>
    selectors.selectMovieSearchResultsTotalCount(state, query)
  );
  const totalPersonCount = useSelector(state =>
    selectors.selectPersonSearchResultsTotalCount(state, query)
  );
  const totalArtistCount = useSelector(state =>
    selectors.selectArtistSearchResultsTotalCount(state, query)
  );
  const totalAlbumCount = useSelector(state =>
    selectors.selectAlbumSearchResultsTotalCount(state, query)
  );

  const totalTrackCount = useSelector(state =>
    selectors.selectTrackSearchResultsTotalCount(state, query)
  );

  function handleChange(event, newValue) {
    historyPush(`/search/${newValue}${search}`);
  }

  useEffect(() => {
    // We are fetching movies and people to show total counts on tab labels.
    dispatch(fetchMovieSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchPersonSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchArtistSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchAlbumSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchTrackSearch(query, DEFAULT_FIRST_PAGE));
  }, [dispatch, query]);

  const totalResults = {
    movie: totalMovieCount,
    person: totalPersonCount,
    artist: totalArtistCount,
    album: totalAlbumCount,
    track: totalTrackCount
  };

  return (
    <>
      <Tabs value={searchType} onChange={handleChange}>
        <Tab value="movie" label={`Movies (${totalMovieCount})`} />
        <Tab value="person" label={`People (${totalPersonCount})`} />
        <Tab value="artist" label={`Artist (${totalArtistCount})`} />
        <Tab value="album" label={`Album (${totalAlbumCount})`} />
        <Tab value="track" label={`Track (${totalTrackCount})`} />
      </Tabs>
      <Box marginTop={2}>
        <SearchResultsHeader
          query={query}
          totalResults={totalResults[searchType]}
        />
        {searchType === "movie" && <MovieSearchResults query={query} />}
        {searchType === "person" && <PersonSearchResults query={query} />}
        {searchType === "artist" && <ArtistSearchResults query={query} />}
        {searchType === "album" && <AlbumSearchResults query={query} />}
        {searchType === "track" && <TrackSearchResults query={query} />}
      </Box>
    </>
  );
}

export default SearchResults;
