import React from "react";
import styled from 'styled-components';

import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";

const MenuItemStyled = styled.div`
  background-color: black;
`;

const useStyles = makeStyles(theme => ({
  menuItem: {
    fontWeight: ({ isSelected }) => (isSelected ? 600 : 400),
    padding: 0
  }
}));

function AutoSearchSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  renderSuggestion
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem ? selectedItem === suggestion.title : false;
  const classes = useStyles({ isSelected });

  return (
    <MenuItem
    
      {...itemProps}
      selected={isHighlighted}
      component="div"
      dense
      className={classes.menuItem}
    >
      {renderSuggestion(suggestion)}

    </MenuItem>
  );
}

export default AutoSearchSuggestion;
