import React from 'react';
import PropTypes from 'prop-types';

import { circleRadius } from '../helpers';

import style from './Person.module.scss';

const Person = ({ x, y, infected }) => (
  <circle
    className={style.Person}
    cx={x}
    cy={y}
    r={circleRadius}
    stroke={infected ? 'red' : 'blue'}
    strokeWidth={1}
    fill={infected ? 'red' : 'transparent'}
  />
);

Person.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  infected: PropTypes.bool.isRequired,
};
export { Person };
