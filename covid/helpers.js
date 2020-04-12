import { uniqBy, uniqueId } from 'lodash';
import * as d3 from 'd3';

const polarToCartesian = (centerX, centerY, radius, angle) => {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

export const CIRCLE_RADIUS = 3;
const MORTALITY = 5;
const ITERATIONS_TO_DIE = 300;

const numberOfRotations = 4096;

const getDistanceBetweenPoints = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

const createPopulation = ({ cx, cy, size }) => {
  const chartRadiusInitial = 4 * CIRCLE_RADIUS;
  const circlesNumberRadius = (size / 2 - 3 * CIRCLE_RADIUS) / (2.5 * CIRCLE_RADIUS);
  const circles = [];
  for (let i = 0; i < numberOfRotations; i += 1) {
    const angleMin = (2 * Math.PI) / numberOfRotations;
    const angle = angleMin * i;
    for (let j = 0; j < circlesNumberRadius; j += 1) {
      const point = {
        ...polarToCartesian(cx, cy, chartRadiusInitial + 3 * j * CIRCLE_RADIUS, angle),
        infected: null,
        recovered: false,
        dead: false,
        key: uniqueId(),
      };

      if (i !== 0) {
        let shouldAdd = true;
        circles.forEach((addedPoint) => {
          if (getDistanceBetweenPoints(point, addedPoint) < 4 * CIRCLE_RADIUS) {
            shouldAdd = false;
          }
        });
        if (shouldAdd) {
          circles.push(point);
        }
      }
    }
  }
  return uniqBy(circles, 'key');
};

const movePopulation = (population) => {
  const random = d3.randomUniform(-2, 2);
  return population.map((person) => {
    if (person.dead) {
      return person;
    }
    return {
      ...person,
      x: person.x + random(),
      y: person.y + random(),
    };
  });
};

const calculateCollisions = (population) => {
  const infected = population.filter((person) => person.infected !== null || person.recovered);
  const notInfected = population.filter(
    (person) => person.infected === null && !person.recovered && !person.dead
  );
  const collisions = infected.map((person) => {
    const spaceQuadTree = d3
      .quadtree()
      .extent([
        [-1, -1],
        [CIRCLE_RADIUS + 2, CIRCLE_RADIUS + 2],
      ])
      .x(({ x }) => x)
      .y(({ y }) => y)
      .addAll(notInfected);
    const candidate = spaceQuadTree.find(person.x, person.y, CIRCLE_RADIUS + 2);
    return candidate;
  });
  return collisions.filter(Boolean);
};

const infectPeople = (population, contacts, elapsedTime) => {
  const keys = contacts.map((p) => p.key);
  return population.map((p) => (keys.includes(p.key) ? { ...p, infected: elapsedTime } : p));
};

const peopleDieOrRecover = (population, elapsedTime) => {
  const random = d3.randomUniform(1, 100);
  return population.map((person) => {
    if (person.infected && (elapsedTime - person.infected) / 60 > ITERATIONS_TO_DIE) {
      const isDead = random() < MORTALITY;
      return {
        ...person,
        recovered: !isDead,
        infected: null,
        dead: isDead,
      };
    }
    return person;
  });
};

export { createPopulation, movePopulation, infectPeople, calculateCollisions, peopleDieOrRecover };
