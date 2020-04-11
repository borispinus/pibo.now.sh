import React from 'react';
import PropTypes from 'prop-types';

import styles from './Avatar.module.scss';

const Avatar = ({ index }) => (
  <div className={styles.Avatar}>
    <img className={styles.image} src={`avatar/${index}.png`} alt="boris pinus" />
  </div>
);

Avatar.propTypes = {
  index: PropTypes.number.isRequired,
};

export { Avatar };
