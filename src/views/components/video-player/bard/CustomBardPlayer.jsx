import React from 'react';
import HlsPlayerV2 from './HlsPlayerV2';

const CustomBardPlayer = ({url, }) => {
  const mp4Source = 'https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4';

  return (
    <div>
      <HlsPlayerV2 source={url} />
    </div>
  );
};

export default CustomBardPlayer;