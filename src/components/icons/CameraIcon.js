import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  const { size = 24, color = '#4E5053', ..._props } = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {..._props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.193 4.55h3.033c.978 0 1.774.76 1.774 1.697v12.222c0 .936-.796 1.698-1.774 1.698H1.774C.796 20.167 0 19.405 0 18.469V6.247c0-.936.796-1.698 1.774-1.698h5.162l2.377-2.6a.364.364 0 01.268-.116h4.967c.103 0 .2.043.268.116l2.377 2.6zM3.548 8.283c0 .374.319.679.71.679.391 0 .71-.305.71-.68 0-.374-.319-.678-.71-.678-.391 0-.71.304-.71.679zm8.517 8.827c-2.744 0-4.968-2.128-4.968-4.753s2.224-4.753 4.968-4.753c2.743 0 4.967 2.128 4.967 4.753s-2.224 4.753-4.967 4.753zM1.833 3.667H5.5v-.688c0-.126-.164-.229-.367-.229H2.2c-.202 0-.367.103-.367.23v.687z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
