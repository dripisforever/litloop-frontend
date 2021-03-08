import { useContext } from 'react';
import { ModalRouteContext } from "components/ModalSwitch";

function useModalGallery() {
  const context = useContext(ModalRouteContext);

  return context;
}

export default useModalGallery;
