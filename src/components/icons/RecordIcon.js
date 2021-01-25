import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  const { color = '#4E5053' } = props;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12.5c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .56-.44 1-1 1-.55 0-1-.45-1-1v-6zm6.3 6H19c0 3.41-2.72 6.23-6 6.72v3.28h-2v-3.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1s5.3-2.1 5.3-5.1z"
        fill={color}
      />
    </Svg>
  );
}
export default SvgComponent;
