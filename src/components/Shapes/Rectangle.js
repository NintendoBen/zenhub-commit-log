import React from 'react';

export const Rectangle = ({
  x = 0,
  y = 0,
  width = 80,
  height = 40,
  fill = 'hotpink',
}) => <rect x={x} y={y} width={width} height={height} fill={fill} />;
