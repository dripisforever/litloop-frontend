import React from 'react';
import { Link } from 'react-router-dom';
import useModalGallery from "hooks/useModalGallery";

export function splitPathnameAndQueryString(path) {
  const [pathname, search] = path.split('?');

  return {
    pathname,
    search: search ? `?${search}` : ''
  };
}

function AddModalStateToLink(to) {
  const { backgroundLocation } = useModalGallery();
  if (typeof to === 'string') {
    const { pathname, search } = splitPathnameAndQueryString(to);
    return {
      pathname: pathname,
      key: location.key,
      search: search,
      state: {
        modal: true,
        backgroundLocation: backgroundLocation.pathname,
        backgroundLocationKey:backgroundLocation.key
      }
    };
  } else {
    return {
      ...to,
      state: {
        ...to.state,
        modal: false
      }
    };
  }
}

function ModalLink({ to, ...rest }) {
  return <Link {...rest} to={AddModalStateToLink(to)} />;
}

// ModalLink.propTypes = Link.propTypes;

export default ModalLink;
