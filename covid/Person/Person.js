import React from 'react';
import PropTypes from 'prop-types';

import { CIRCLE_RADIUS } from '../helpers';

import style from './Person.module.scss';

const Person = ({ x, y, infected, dead, recovered }) => {
  let fillColor = 'white';
  let strokeColor = 'blue';
  if (dead) {
    fillColor = 'gray';
    strokeColor = 'gray';
  } else if (recovered) {
    fillColor = 'green';
    strokeColor = 'green';
  } else if (infected !== null) {
    fillColor = 'red';
    strokeColor = 'red';
  }
  return (
    <circle
      className={style.Person}
      cx={x}
      cy={y}
      r={CIRCLE_RADIUS}
      stroke={strokeColor}
      strokeWidth={1}
      fill={fillColor}
    />
  );
};

Person.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dead: PropTypes.bool.isRequired,
  recovered: PropTypes.bool.isRequired,
  infected: PropTypes.number,
};

Person.defaultProps = {
  infected: null,
};

export { Person };
