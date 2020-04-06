import React from 'react';
import PropTypes from 'prop-types';

import styles from './Avatar.module.scss';

const Avatar = ({ index }) => (
  <div className={styles.Avatar}>
    <img src={`avatar/${index}.png`} alt="boris pinus" />
  </div>
);

Avatar.propTypes = {
  index: PropTypes.number.isRequired,
};

export { Avatar };
