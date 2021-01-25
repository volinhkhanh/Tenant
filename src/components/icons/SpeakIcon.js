import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  const { color = '#4E5053' } = props;
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 5.29V3.23c4.01.91 7 4.49 7 8.77 0 4.28-2.99 7.86-7 8.77v-2.06c2.89-.86 5-3.54 5-6.71s-2.11-5.85-5-6.71zM3 15V9h4l5-5v16l-5-5H3zm7 .17V8.83L7.83 11H5v2h2.83L10 15.17zM16.5 12A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
