import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
// import Subscriptions from "./Subscriptions";
import { HomeIcon, TrendingIcon, SubIcon, LibIcon, HistoryIcon, VidIcon, LikeIcon, } from "./Icons";
import { closeSidebar } from "core/reducers/sidebar";
import { FiMessageCircle } from 'react-icons/fi';
import { TbMessageCircle2 } from 'react-icons/tb';
import { FaHistory } from 'react-icons/fa';
import { MdVideoLibrary } from 'react-icons/md';
import { FaWpexplorer } from 'react-icons/fa';


const SidebarWrapper = styled.div`
  position: fixed;
  /* top: 6em; */
  top: 0;
  padding-top: 4em;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.grey};
  background: #212121;
  /* padding-top: 1rem; */
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
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
`;

const StyledLi = styled.li`

`;

const LinkStyled = styled(Link)`
  font-weight: bold;
  color: #FFF;
  text-decoration: none;
  &:hover: {
    text-decoration: underline;
  }

  /* display: grid;

  grid-gap: 1em;
 grid-template-columns: 20px 29px minmax(81px,0fr); */
  display: flex;
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

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebar: open } = useSelector((state) => state.sidebar);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <SidebarWrapper open={open}>
      <StyledUl>
        <StyledLi>
          <LinkStyled onClick={handleCloseSidebar} to="/feed/trending">
            <div className="icon">
              <TrendingIcon />

            </div>
            <span>Trending</span>
          </LinkStyled>
        </StyledLi>

        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/explore"
            // activeClassName="active"
          >
            <div className="icon">
              {/*<VidIcon />*/}
              <FaWpexplorer />

            </div>
            <span>Explore</span>
          </LinkStyled>
        </StyledLi>

        <StyledLi>
          <LinkStyled onClick={handleCloseSidebar} to="/feed/trending">
            <div className="icon">
              {/*<MessagesIcon />*/}
              {/*<FiMessageCircle />*/}
              <TbMessageCircle2 />

            </div>
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
        <StyledLi>
          <LinkStyled
            onClick={handleCloseSidebar}
            to="/feed/history"
            // activeClassName="active"
          >
            <div className="icon">
              <HistoryIcon />
              {/*<FaHistory />*/}

            </div>
            <span>History</span>
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
            <div className="icon">
              {/*<LikeIcon />*/}
              <h3>Playlists</h3>
            </div>
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
