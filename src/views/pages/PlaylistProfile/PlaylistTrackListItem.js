import React, {useState} from "react";
import { useSelector, connect } from "react-redux";
import { Link, useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";

// MATERIAL
import { ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import CardActionArea from '@material-ui/core/CardActionArea';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
// import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// VIEWS
import BaseImage from "views/components/BaseImage";
import BaseCard from "views/components/BaseCard";
import BaseCardHeader from "views/components/BaseCardHeader";
import RouterLink from "views/components/RouterLink";
import ModalLink from "views/components/ModalLink";
import IconButton from "views/components/icon-button/IconButton";
import FormattedTime from "views/components/formatted-time/FormattedTime";
import { getAspectRatioString } from "views/components/AspectRatio";
import "views/components/track-card/track-card.css"


// CORE
import { selectors } from "core/reducers/index";


const useStyles = makeStyles(theme => ({
  linkHover: {
    fontWeight: "bold",
    color: '#FFF',
    textDecoration: 'none',
    "&:hover": {
      textDecoration: "underline"
    }
    // "&:hover": {
    //   opacity: 0.7
    // },
    // "&:hover", "&:focus", "&:hover", "&:visited", "&:link", "&:active": {
    //   textDecoration: "underline"
    // }
  },
  linkHoverz: {
    fontWeight: "bold",
    color: '#FFF',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: "underline"
    }
  },
  root: {
    paddingTop: "0px",
    paddingBottom: "0px",
    display: "flex",
    cursor: "default",
    // flexDirection: "column"

  },
  icons: {
    display: "flex"
  },
  stepperIcon: {
    fontSize: theme.typography.h2.fontSize
  },
  active: {
    // display: "contents",
    fontWeight: "bold",

    // color: "#646498",
    color: "#6666d8",

    // color: "#5848f8;",
    textDecoration: 'none',
    '&:hover': {
      textDecoration: "underline"
    }

    // background: rgb(51, 51, 51);
  }
}));


const HideIndexItem = styled.div`
  padding: 0 16px;
  display: grid;
  grid-template-columns: 25px 40px 28fr 3fr minmax(120px,1fr);
  grid-gap: 16px;
  &:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }

  /* playButton */

  &:hover .trackNumber span {
    display: none;
  }
  &:hover .trackNumber div {
    display: inline-block;
  }

  .trackNumber div {
    position: absolute;
    background: transparent;
    border: 0;
    padding: 0;
    color: #fff;
    display: none;
  }
  .trackNumber  {
    display: flex;
    align-items: center;
    /* justify-self: end; */
  }

  border-radius: 4px;
`;


const ListItemz = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "green",

      // backgroundColor: "rgba(255,255,255,.3)",

      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "purple",
      // backgroundColor: "rgba(255,255,255,.3)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "blue",
      // backgroundColor: "rgba(255,255,255,.3)",

      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
        // opacity: "0.1",
      }
    }
  },
  selected: {}
})(MuiListItem);

const mini_style = {
  fontSize: "20px",
  position: "relative",
  color: "#ccc",
  cursor: "default",
};

const album_cover = {
  display: "flex",
  alignItems: "center",
}
// const classes = useStyles();
function LinkTrack(obj, id) {
  const classes = useStyles();
  return (
    <span>
      <Link
        // className={classes.linkHoverz}
        className={
          obj.track.id === id
                ? `${classes.active}`
                : `${classes.linkHoverz}`
        }
        to={`/track/${obj.track.id}/`}
        underline="hover"
        // style={{
        //   fontWeight: "bold",
        //   color: '#FFF',
        //   textDecoration: 'none',
        //   "&:hover": {
        //     textDecoration: "underline"
        //   }
        // }}
        >

        {obj.track.name}

      </Link>
    </span>
  )
}

function PlaylistTrackListItem({
  playlistTrackId,
  key,
  songId,
  songPlaying,
  songPaused,
  index,
  resumeSong,
  pauseSong,
  audioControl,


  isCompact, isPlaying, isSelected, pause, play,

  subheader,
  ...rest
}) {
  const { pathname } = useLocation();
  const classes = useStyles();
  // const playlistTrack = useSelector(state => selectors.selectTrack(state, playlistTrackId));
  // const playlistTrack = useSelector(state => selectors.selectPlaylistTracks(state, playlistTrackId));
  const track = useSelector(state => selectors.selectPlaylistTrack(state, playlistTrackId));

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, songId) => {
    setSelectedIndex(songId);
  };

  const buttonClass = track.track.id === songId && !songPaused ? "fa-pause" : "fa-play";

  const doubleClickPlayTrack = (event) => {
    if (event.detail === 2) {
      console.log('double click');
      (track.track.id) === (songId && songPlaying && songPaused) ? resumeSong(): (songPlaying && !songPaused && track.track.id) === songId ? pauseSong(): audioControl(track);
    }
  }
  const singleClickPlayTrack = (event) => {
    console.log('single click');
    track.track.id === songId && songPlaying && songPaused ? resumeSong(): songPlaying && !songPaused && track.track.id === songId ? pauseSong(): audioControl(track);
  }

  const secondaryDAMN = track.track.artists.map((artist, i) =>
    <span key={i}>
      {i > 0 && ", "}
      <Link to={`/artist/${artist.id}/`} className={classes.linkHover} underline="hover">
        {artist.name}
      </Link>
    </span>
  )

  return (
    <HideIndexItem className="DRIPTA" onClick={doubleClickPlayTrack} key={key} dense {...rest} index={index}>

      {/*<CardActionArea className={classes.root}>*/}


        <div className="trackNumber">
          <span
            // className={
            //   track.track.id === id ? `${classes.active}`: `${classes.linkHoverz}`
            // }

            >
            {index+1}
          </span>
          <div className="play-song" onClick={singleClickPlayTrack} style={mini_style}>
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
          </div>

        </div>



        <ListItemAvatar style={album_cover}>
          <Avatar src={track.track.album.images[2] ? track.track.album.images[2].url : ""}  variant={"rounded"} />
        </ListItemAvatar>

        <ListItemText primary={LinkTrack(track, songId)} secondary={secondaryDAMN} />

        <FormattedTime value={track.track.duration_ms} unit={'ms'} />
      {/*</CardActionArea>*/}

    </HideIndexItem>

    // <SongItem>
    //
    // </SongItem>
  );
}


const mapStateToProps = (state) => {

  return {

    // songs:                     state.songsReducer.songs ? state.songsReducer.songs : '',

    // fetchSongsError:           state.songsReducer.fetchSongsError,
    // fetchSongsPending:         state.songsReducer.fetchSongsPending,
    // fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,

    // songPlaying:               state.songsReducer.songPlaying,
    // songPaused:                state.songsReducer.songPaused,
    // songId:                    state.songsReducer.songId,

    songPlaying:               state.entities.playlistTracks.songPlaying,
    songPaused:                state.entities.playlistTracks.songPaused,
    songId:                    state.entities.playlistTracks.songId,

    // play: audio.play,

    // songAddedId: state.userReducer.songId || '',
    // viewType:                  state.songsReducer.viewType,
    //
  };

};

const mapPlaylistTrackListItemToProps = (dispatch) => {

  // return bindActionCreators({
  //   fetchSongs,
  //   addSongToLibrary
  // }, dispatch);

};

export default connect(mapStateToProps, {})(PlaylistTrackListItem);
