import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  const { color = '#4E5053' } = props;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM13 13V7h-2v6h2zm0 4v-2h-2v2h2zm-9-5c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
