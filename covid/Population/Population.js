import React from 'react';
import PropTypes from 'prop-types';

import { Person } from '../Person/Person';

const Population = ({ data }) => {
  return (
    <g>
      {data.map(({ x, y, infected }) => (
        <Person key={`${x}-${y}`} x={x} y={y} infected={infected} />
      ))}
    </g>
  );
};

Population.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      infected: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export { Population };
