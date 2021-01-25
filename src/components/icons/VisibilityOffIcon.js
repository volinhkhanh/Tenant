import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  const { size = 24, color = '#4E5053', ..._props } = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {..._props}>
      <Path
        d="M4.69 6.525l-2.68-2.68 1.41-1.42 17.73 17.74-1.41 1.41-3.42-3.42c-1.34.53-2.8.82-4.32.82-5 0-9.27-3.11-11-7.5.77-1.97 2.06-3.67 3.69-4.95zm7.31-.55a9.77 9.77 0 018.82 5.5 9.647 9.647 0 01-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53-1.73-4.39-6-7.5-11-7.5-1.27 0-2.49.2-3.64.57l1.65 1.65c.65-.13 1.31-.22 1.99-.22zm-1.07 1.14L13 9.185c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07.01-2.48-2.01-4.49-4.49-4.49-.37 0-.72.05-1.07.14zm-1.42 4.23l2.61 2.61c-.04.01-.08.02-.12.02a2.5 2.5 0 01-2.5-2.5c0-.025.002-.045.005-.065a.492.492 0 00.005-.065zm-1.65-1.65l-1.75-1.75c-1.21.92-2.23 2.1-2.93 3.53a9.77 9.77 0 008.82 5.5c.95 0 1.87-.14 2.75-.38l-.98-.98a4.507 4.507 0 01-6.27-4.14c0-.63.13-1.23.36-1.78z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
