import React from "react";
import styled from 'styled-components';

import LoadingIndicator from "views/components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const DEFAULT_ITEMS = [];

function defaultKeyExtractor(id) {
  return id;
}
// const FlexList = styled.div`
//   list-style: "none";
//   padding: 0;
//   display: "list-item";
//   grid-gap: ${({ spacing }) => theme.spacing(spacing)};
//   grid-template-columns: ${({ minItemWidth }) => repeat(auto-fill, minmax(minItemWidth, 1))}
// `;


// grid-template-columns

const useStyles = makeStyles(theme => ({
  flexList: {
    listStyle: "none",
    padding: 0,
    display: "list-item",
    gridGap: ({ spacing }) => theme.spacing(spacing),
    gridTemplateColumns: ({ minItemWidth }) =>
      `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`
  }
}));

function BaseAlterList({
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 160,
  keyExtractor = defaultKeyExtractor,
  listEmptyMessage = "Nothing has been found"
}) {
  const classes = useStyles({ minItemWidth, spacing });

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  }

  if (!items.length && !loading) {
    if (typeof listEmptyMessage === "string") {
      return <Typography>{listEmptyMessage}</Typography>;
    }

    return listEmptyMessage;
  }

  // if (isFetching) {
  //   return <Skeleton />;
  // }
  return (
    <React.Fragment>
      <div className={classes.flexList}>
      {/*<FlexList>*/}
        {items.map((item, index) => (
          <React.Fragment key={extractItemKey(item, index)}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      {/*</FlexList>*/}
      </div>
      {/*<LoadingIndicator loading={loading} />*/}
    </React.Fragment>
  );
}

export default BaseAlterList;
