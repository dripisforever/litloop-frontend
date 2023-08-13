
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

<Viewer
  fileUrl='/assets/pdf-open-parameters.pdf'
  plugins={[
      // Register plugins
      defaultLayoutPluginInstance,
      ...
  ]}
/>
