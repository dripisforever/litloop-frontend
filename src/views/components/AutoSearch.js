import React from "react";
import styled from 'styled-components';

import Downshift from "downshift";

// MATERIAL DONE
// import { makeStyles } from "@mui/material/styles";
// import { TextField, Paper, InputAdornment, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";


// VIEWS
import TextInput from 'views/components/SearchBar/TextField';
import LoadingIndicator from "views/components/LoadingIndicator";
// import clsx from "clsx";
import AutoSearchSuggestion from "./AutoSearchSuggestion";


// const useStyles = makeStyles(theme => ({
//   container: {
//     flexGrow: 1,
//     position: "relative"
//   },
//   paper: {
//     position: "absolute",
//     zIndex: 1,
//     marginTop: theme.spacing(1),
//     left: 0,
//     right: 0,
//     maxHeight: 380,
//     overflow: "auto"
//   },
//   inputInput: {
//     width: "auto",
//     flexGrow: 1
//   },
//
//   root: {
//     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       // borderColor: "green"
//     },
//     "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//       // borderColor: "red"
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "white"
//     },
//     "& .MuiOutlinedInput-input": {
//       // color: "green"
//     },
//     "&:hover .MuiOutlinedInput-input": {
//       // color: "red"
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
//       // color: "purple"
//     },
//     "& .MuiInputLabel-outlined": {
//       // color: "green"
//     },
//     "&:hover .MuiInputLabel-outlined": {
//       // color: "red"
//     },
//     "& .MuiInputLabel-outlined.Mui-focused": {
//       color: "white"
//     }
//   },
// }));

const StyledTextField = styled.input`

`;
const StyledAutoSearchSuggestion = styled.div`
  position: absolute;
  z-index: 1;
  margin-top: 10px;
  /* left: 0; */
  /* right: 0; */
  max-height: 380px;
  width: 50%;
  /* overflow: auto; */
`;
const StyledPaper = styled.div`

`;
const Container = styled.div`

`;

const SearchTx = styled(TextInput)`
  flex: 1;
  margin: 0px 16px;
  width: 100%;
  border: 0;
  // margin-right: 25em;
`;
const StyledSearchIcon = styled.div`

`;

function AutoSearch({
  className,
  label,
  placeholder = "Search",
  loading,
  suggestions = [],
  renderSuggestion,
  inputValue,
  onInputValueChange,
  onItemSelect,
  onPressEnterOrClickSearch,
  autoFocus,
  extractSuggestionKey
}) {
  // const classes = useStyles();

  function handleInputChange(event) {
    const value = event.target.value;
    onInputValueChange(value);
  }
  // const q = new URLSearchParams(window.location.search).get('query');
  return (
    <Downshift
      inputValue={inputValue || ''}
      onSelect={onItemSelect}
      itemToString={item => item?.title || ""}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        openMenu,
        closeMenu,
        selectedItem
      }) => {
        const { onChange, onBlur, onFocus, ...inputProps } = getInputProps({
          placeholder
        });
        const q = new URLSearchParams(window.location.search).get('query');
        function handlePressEnterOrSearch() {
          onPressEnterOrClickSearch(inputValue);
          closeMenu();
        }

        return (
          <div
            // className={clsx(classes.container, className)}
            className="INPUT"
            >
            <SearchTx
              value={q || ''}
              onChange={(event) => {
                openMenu();
                handleInputChange(event);
                return onChange;
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handlePressEnterOrSearch();
                }
              }}
              hintText="Search"
              rounded
            />



            <div {...getMenuProps()}>
              {isOpen ? (
                <StyledAutoSearchSuggestion
                  // className={classes.paper}
                  square
                >
                  {/*<LoadingIndicator loading={loading}>*/}
                    {suggestions.map((suggestion, index) => {
                      return (
                        <AutoSearchSuggestion
                          key={extractSuggestionKey(suggestion)}
                          suggestion={suggestion}
                          renderSuggestion={renderSuggestion}
                          index={index}
                          itemProps={getItemProps({
                            item: suggestion
                          })}
                          highlightedIndex={highlightedIndex}
                          selectedItem={selectedItem}
                        />
                      );
                    })}
                  {/*</LoadingIndicator>*/}

                </StyledAutoSearchSuggestion>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}

export default AutoSearch;
