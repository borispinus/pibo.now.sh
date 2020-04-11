import { uniqBy } from 'lodash';

function polarToCartesian(centerX, centerY, radius, angle) {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export const circleRadius = 5;

const numberOfRotations = 4096;

const getDistanceBetweenPoints = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

const createPopulation = ({ cx, cy, size }) => {
  const chartRadiusInitial = 4 * circleRadius;
  const circlesNumberRadius = (size / 2 - 3 * circleRadius) / (3 * circleRadius);
  const circles = [];
  for (let i = 0; i < numberOfRotations; i += 1) {
    const angleMin = (2 * Math.PI) / numberOfRotations;
    const angle = angleMin * i;
    for (let j = 0; j < circlesNumberRadius; j += 1) {
      const point = {
        ...polarToCartesian(cx, cy, chartRadiusInitial + 3 * j * circleRadius, angle),
        infected: false,
      };

      if (i !== 0) {
        let shouldAdd = true;
        circles.forEach((addedPoint) => {
          if (getDistanceBetweenPoints(point, addedPoint) < 4 * circleRadius) {
            shouldAdd = false;
          }
        });
        if (shouldAdd) {
          circles.push(point);
        }
      }
    }
  }
  return uniqBy(circles, ({ x, y }) => `${x}-${y}`);
};

export { createPopulation };
