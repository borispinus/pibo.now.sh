import React from 'react';
import PropTypes from 'prop-types';

import { Person } from '../Person/Person';

const Population = ({ data }) => {
  return (
    <g>
      {data.map((person) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Person {...person} />
      ))}
    </g>
  );
};

Population.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      dead: PropTypes.bool.isRequired,
      recovered: PropTypes.bool.isRequired,
      infected: PropTypes.number,
    })
  ).isRequired,
};

export { Population };
