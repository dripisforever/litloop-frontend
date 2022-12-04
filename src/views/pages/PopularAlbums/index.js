import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchPopularAlbums } from "core/actions";
import { selectors } from "core/reducers/index";
import MovieCard from "views/components/MovieCard";
import AlbumItem from "views/components/AlbumItem";
import InfiniteGridList from "views/components/InfiniteGridList";

function renderItem(albumId) {
  return (
    <li>
      <AlbumItem albumId={albumId} />
    </li>
  );
}

function PopularAlbums() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPopularAlbums(state)
  );
  const nextPage = useSelector(state =>
    selectors.selectPopularAlbumsNextPage(state)
  );
  const albumIds = useSelector(state => selectors.selectPopularAlbumIds(state));

  function handleLoadMore() {
    // dispatch(fetchPopularMovies(nextPage));
    dispatch(fetchPopularAlbums(nextPage));
  }

  return (
    <InfiniteGridList
      items={albumIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={renderItem}
    />
  );
}

export default PopularAlbums;
