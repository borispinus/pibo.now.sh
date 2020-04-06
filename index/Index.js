import React, { useState } from 'react';

import { Links } from './Links/Links';
import { Avatar } from './Avatar/Avatar';

import style from './Index.module.scss';

const IMAGE_COUNT = 5;

const Index = () => {
  const [colorIndex, setColorIndex] = useState(0);

  const handleLinkHover = () => {
    setColorIndex(Math.floor(Math.random() * IMAGE_COUNT));
  };

  return (
    <div className={style.Index}>
      <Avatar index={colorIndex} />
      <div className={style.info}>
        <h1 className={style.name}>boris pinus</h1>
        <p className={style.speciality}>frontend developer</p>
        <Links onHover={handleLinkHover} />
      </div>
    </div>
  );
};

export { Index };
