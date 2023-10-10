import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
// import Subscriptions from "./Subscriptions";
import { HomeIcon, TrendingIcon, SubIcon, LibIcon, HistoryIcon, VidIcon, LikeIcon, } from "./Icons";
import { closeSidebar } from "core/reducers/sidebar";
import { FiMessageCircle } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';
import { FiBookmark } from 'react-icons/fi';
import { TbMessageCircle2 } from 'react-icons/tb';
import { FaHistory } from 'react-icons/fa';
import { MdVideoLibrary } from 'react-icons/md';
import { MdAlbum } from 'react-icons/md';
import { FaWpexplorer } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';


const SidebarWrapper = styled.div`
  position: fixed;
  /* top: 6em; */
  top: 0;
  padding-top: 4em;
  left: 0;
  /* height: 100vh; */
  height: 100%;
  width: 240px;
  /* background: ${(props) => props.theme.grey}; */
  /* background: #212121; */
  background: ${(props) => props.theme.sideBarColor};
  /* padding-top: 1rem; */


  /* overflow: auto; */
  overflow-y: auto;

  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.7rem 0;
    padding-left: 1.5rem;
    /* margin-bottom: 0.4rem; */
  }

  .icon:not(.hover-disable):hover {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active div {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active svg {
    fill: #fff;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
      props.open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const StyledUl = styled.ul`
  align-items: flex-start;
  list-style: none;
  padding-right: 10px;
`;

const StyledLi = styled.li`
  &:hover {
    background-color: ${props => props.theme.sideBarHoverColor};
    border-radius: 6px;
  }
  /* border-style: dotted */
`;

const LinkStyled = styled(Link)`
  align-items: center;
  color: ${props => props.theme.text};
  text-decoration: none;
  &:hover: {
    text-decoration: underline;
  }

  /* display: grid; */

  /* grid-gap: 1em; */
   /* grid-template-columns: 20px 29px minmax(81px,0fr); */
  display: flex;

  span {
    font-family: Helvetica;
  }
`;

// const links = [
//   {
//     iconName:"",
//     path: "/trending"
//   },
//   {
//     path: "/explore"
//   },
//   {
//     path: "/messages"
//   },
//   {
//     path: "/history"
//   },
//   {
//     path: "/"
//   },
//
//
//   {
//     path: "/playlists"
//   },
//   {
//     path: "/playlist/1iC9VT69XLLRPtrkBA7tCT"
//   },
//   {
//     path: "/playlist/1a4WG4Bm6WsfcXMxQ3F1Zr"
//   },
//   {
//     path: "/playlist/3NcpCaLNsoz4HOjzUCWwSl"
//   },
//   {
//     path: "/playlist/7I38G6zePIPIBaV1WvjFOI"
//   },
//   {
//     path: "/playlist/2T2srNcQWBiVj6v0CYOD2n"
//   }
// ];

// const link_to = links.map((link) => {
//   <LinkStyled
//     to={link.path}
//     onClick={handleCloseSidebar}
//     >
//     <${link.iconName}Icon/>
//   </LinkStyled
// })
const StyledDivIcon = styled.div`
  margin-right: 10px;

  svg {
    height: 16px;
    width: 16px;
    color: ${props => props.theme.text};
  }

`;
const SCTrendingIcon = styled(TrendingIcon)`


    height: 16px;
    width: 16px;
    fill: ${props => props.theme.text};


`;


const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebar: open } = useSelector((state) => state.sidebar);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <SidebarWrapper open={open}>
      <StyledUl>
        <StyledLi id="Trending">
          <LinkStyled onClick={handleCloseSidebar} to="/feed/trending">
            <StyledDivIcon className="icon">
              <SCTrendingIcon />

            </StyledDivIcon>
            <span>Trending</span>
          </LinkStyled>
        </StyledLi>

        <StyledLi id="Explore">
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/explore"
            // activeClassName="active"
          >
            <StyledDivIcon className="icon">
              {/*<VidIcon />*/}
              <FaWpexplorer />

            </StyledDivIcon>
            <span>Explore</span>
          </LinkStyled>
        </StyledLi>

        <StyledLi id="Messages">
          <LinkStyled onClick={handleCloseSidebar} to="/messages">
            <StyledDivIcon className="icon">
              {/*<MessagesIcon />*/}
              {/*<FiMessageCircle />*/}
              <TbMessageCircle2 />

            </StyledDivIcon>
            <span>Messages</span>
          </LinkStyled>
        </StyledLi>
        {/*<div className="ruler"></div>*/}

        {/*<LinkStyled
          onClick={handleCloseSidebar}
          to="/feed/library"
          // activeClassName="active"
        >
          <div className="icon">
            <LibIcon />
            <MdVideoLibrary />
            <span>Library</span>
          </div>
        </LinkStyled>*/}

        {/*<StyledLi id="History">
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/feed/history"
            // activeClassName="active"
          >
            <StyledDivIcon className="icon">

              <FiClock />


            </StyledDivIcon>
            <span>History</span>
          </LinkStyled>
        </StyledLi>*/}

        {/*<StyledLi id="Albums">
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/albums"
          >
            <StyledDivIcon className="icon">
              <MdAlbum />


            </StyledDivIcon>
            <span>New Albums</span>
          </LinkStyled>
        </StyledLi>*/}

        <StyledLi id="Bookmarks">
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/bookmarks"
            // activeClassName="active"
          >
            <StyledDivIcon className="icon">
              <FiBookmark />
              {/*<FaHistory />*/}

            </StyledDivIcon>
            <span>Bookmarks</span>
          </LinkStyled>
        </StyledLi>
        <StyledLi id="Magazines">
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/magazines"
            // activeClassName="active"
          >
            <StyledDivIcon className="icon">
              {/*<FiBookmark />*/}
              <BsBook />
              {/*<FaHistory />*/}

            </StyledDivIcon>
            <span>Magazines</span>
          </LinkStyled>
        </StyledLi>
        {/*<StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/feed/liked"
            // activeClassName="active"
          >
            <div className="icon">
              // <LikeIcon />

            </div>
            <span>Liked</span>
          </LinkStyled>
        </StyledLi>*/}



        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/playlists/"
            // activeClassName="active"
          >
            <StyledDivIcon className="icon">
              {/*<LikeIcon />*/}
              <div>Playlists</div>
            </StyledDivIcon>
          </LinkStyled>
        </StyledLi>

        <StyledLi>
          <LinkStyled onClick={handleCloseSidebar} to="/vine/top250">
            <div className="icon"><span>Top 250 Vines</span></div>
          </LinkStyled>
        </StyledLi>
        <StyledLi>
          <LinkStyled onClick={handleCloseSidebar} to="/playlist/1iC9VT69XLLRPtrkBA7tCT">
            <div className="icon"><span>DRIPTASET</span></div>
          </LinkStyled>
        </StyledLi>

        <StyledLi>

          <LinkStyled
            onClick={handleCloseSidebar}
            to="/playlist/1a4WG4Bm6WsfcXMxQ3F1Zr"
            // activeClassName="active"
          >
            <div className="icon">
              {/*<LikeIcon />*/}
              <span>FUTURE HENDRIX</span>
            </div>
          </LinkStyled>

        </StyledLi>

        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/playlist/3NcpCaLNsoz4HOjzUCWwSl"
            // activeClassName="active"
          >
            <div className="icon">
              {/*<LikeIcon />*/}
              <span>GUCCI MANE</span>
            </div>
          </LinkStyled>

        </StyledLi>

        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/playlist/7I38G6zePIPIBaV1WvjFOI"
            // activeClassName="active"
          >
            <div className="icon">
              {/*<LikeIcon />*/}
              <span>Juicy J</span>
            </div>
          </LinkStyled>


        </StyledLi>

        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/playlist/2T2srNcQWBiVj6v0CYOD2n"
            // activeClassName="active"
          >
            <div className="icon">
              {/*<LikeIcon />*/}
              <span>MARILYN MANSON</span>
            </div>
          </LinkStyled>
        </StyledLi>



        <div className="ruler"></div>

        {/*<Subscriptions />*/}
      </StyledUl>
    </SidebarWrapper>
  );
};

export default Sidebar;
