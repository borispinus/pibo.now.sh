import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import { Population } from './Population/Population';
import {
  calculateCollisions,
  createPopulation,
  infectPeople,
  movePopulation,
  peopleDieOrRecover,
} from './helpers';

import style from './Covid.module.scss';

const usePopulation = (params) => {
  const [population, setPopulation] = useState([]);
  const [simulating, setSimulating] = useState(false);

  const startSimulation = () => {
    const nextPopulation = [...population];
    const randomPersonIndex = Math.floor(Math.random() * nextPopulation.length);
    nextPopulation[randomPersonIndex].infected = 0;

    setPopulation(nextPopulation);
    setSimulating(true);
  };

  const stopSimulation = () => {
    setSimulating(false);
    setPopulation(createPopulation(params));
  };

  const iteratePopulation = (elapsedTime) => {
    setPopulation((prevPopulation) => {
      let nextPopulation = movePopulation(prevPopulation);
      nextPopulation = infectPeople(
        nextPopulation,
        calculateCollisions(nextPopulation, elapsedTime),
        elapsedTime
      );
      nextPopulation = peopleDieOrRecover(nextPopulation, elapsedTime);
      return nextPopulation;
    });
  };

  useEffect(() => {
    if (!simulating) return null;
    const timer = d3.timer((elapsedTime) => {
      iteratePopulation(elapsedTime);
      if (!simulating) timer.stop();
    });
    return () => timer.stop();
  }, [simulating]);

  useEffect(() => {
    setPopulation(createPopulation(params));
  }, []);
  return { population, startSimulation, stopSimulation };
};

const Covid = () => {
  const { population, startSimulation, stopSimulation } = usePopulation({
    cx: 300,
    cy: 300,
    size: 350,
  });
  const showButton = population.every((person) => person.infected === null);

  const totalAmount = population.length;
  const infectedAmount = population.filter((person) => person.infected !== null).length;
  const deadAmount = population.filter((person) => person.dead).length;
  const recoveredAmount = population.filter((person) => person.recovered).length;

  return (
    <div className={style.Covid}>
      <h1 className={style.header}>virus spread viz</h1>
      <svg className={style.chart}>
        <Population data={population} />
      </svg>
      <div className={style.info}>
        <div style={{ marginRight: 10 }}>
          total:
          {totalAmount}
        </div>
        <div style={{ color: 'red', marginRight: 10 }}>
          infected:
          {infectedAmount}
        </div>
        <div style={{ color: 'green', marginRight: 10 }}>
          recovered:
          {recoveredAmount}
        </div>
        <div style={{ color: 'gray', marginRight: 10 }}>
          dead:
          {deadAmount}
        </div>
      </div>
      {showButton && (
        <button className={style.infectBtn} type="button" onClick={startSimulation}>
          Infect
        </button>
      )}
      {!showButton && (
        <button className={style.infectBtn} type="button" onClick={stopSimulation}>
          Stop
        </button>
      )}
    </div>
  );
};

export { Covid, usePopulation };
