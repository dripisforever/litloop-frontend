import React from "react";
import styled from 'styled-components';

import LoadingIndicator from "views/components/LoadingIndicator";

// MATERIAL UNDONE
// import { makeStyles } from "@mui/material/styles";
// import { Typography } from "@mui/material";
import { StyledTypography } from "views/styledComponents";

const DEFAULT_ITEMS = [];

function defaultKeyExtractor(id) {
  return id;
}
const FlexList = styled.div`
  list-style: none;
  padding: 0;
  display: list-item;
  grid-gap: ${(props) => props.theme.spacing};
  grid-template-columns: ${(props) => `repeat(auto-fill, minmax(${props.minItemWidth}px, 1))`}
`;


// grid-template-columns

// const useStyles = makeStyles(theme => ({
//   flexList: {
//     listStyle: "none",
//     padding: 0,
//     display: "list-item",
//     gridGap: ({ spacing }) => theme.spacing(spacing),
//     gridTemplateColumns: ({ minItemWidth }) =>
//       `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`
//   }
// }));

function BaseAlterList({
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 160,
  keyExtractor = defaultKeyExtractor,
  listEmptyMessage = "Nothing has been found"
}) {
  // const classes = useStyles({ minItemWidth, spacing });

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string" ? item[keyExtractor] : keyExtractor(item, index);
  }

  if (!items.length && !loading) {
    if (typeof listEmptyMessage === "string") {
      return <StyledTypography>{listEmptyMessage}</StyledTypography>;
    }

    return listEmptyMessage;
  }

  // if (isFetching) {
  //   return <Skeleton />;
  // }

  // useEffect(() => {
  //
  //   const observer = new IntersectionObserver(
  //     entries => {
  //       entries.forEach(entry => {
  //
  //         if (entry.intersectionRatio) {
  //           // callback('WOW-------------------' + entry.target);
  //           console.log('WOW-------------------' );
  //
  //           const url = 'http://localhost:8000/';
  //
  //
  //           fetch(url)
  //           observer.unobserve(entry.target);
  //         }
  //
  //
  //       });
  //     },
  //     { threshold: 1.00 }
  //   );
  //   paragraphObserver.current = observer;
  // }, []);

  return (
    <React.Fragment>
      {/*<div className={classes.flexList}>*/}
      <FlexList>
        {items.map((item, index) => (
          <React.Fragment key={extractItemKey(item, index)}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </FlexList>
      {/*</div>*/}
      {/*<LoadingIndicator loading={loading} />*/}
    </React.Fragment>
  );
}

export default BaseAlterList;
