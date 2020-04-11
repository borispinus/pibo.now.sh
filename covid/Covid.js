import React, { useState } from 'react';

import { Population } from './Population/Population';
import { createPopulation } from './helpers';

import style from './Covid.module.scss';

const usePopulation = (params) => {
  const [population, setPopulation] = useState(createPopulation(params));

  const startSimulation = () => {
    const nextPopulation = [...population];
    const randomPersonIndex = Math.floor(Math.random() * nextPopulation.length);
    nextPopulation[randomPersonIndex].infected = true;
    setPopulation(nextPopulation);
  };
  return { population, startSimulation };
};

const Covid = () => {
  const { population, startSimulation } = usePopulation({
    cx: 250,
    cy: 250,
    size: 400,
  });
  return (
    <div className={style.Covid}>
      <svg className={style.chart}>
        <Population data={population} />
      </svg>
      <button className={style.infectBtn} type="button" onClick={startSimulation}>
        Infect
      </button>
    </div>
  );
};

export { Covid, usePopulation };
