import './config';
import axios from 'axios';

const url = 'https://adventofcode.com/2020/day/3/input';

const getInputData = async () : Promise<Boolean[][]> => {
  const { data } = await axios.get(url);
  return data
    .split('\n').map(
      (s: string) => s.split('').map((t: string) => t === '#'),
    );
};

interface Slope {
  dx: number,
  dy: number,
}

const countTreesForSlope = (trees: Boolean[][], { dx, dy } : Slope) => {
  let [x, y] = [dx, dy]; // Starting position not counted
  const [h, w] = [trees.length, trees[0].length];

  let treeCount = 0;
  while (y < h) {
    treeCount += trees[y][x % w] ? 1 : 0;
    y += dy;
    x += dx;
  }

  return treeCount;
};

const solvePartOne = (trees: Boolean[][]) => {
  const answer = countTreesForSlope(trees, { dx: 3, dy: 1 });
  console.log(`Answer #1: ${answer}`);
};

const solvePartTwo = (trees: Boolean[][]) => {
  const slopes : Slope[] = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];
  const answer = slopes
    .map((s: Slope) => countTreesForSlope(trees, s))
    .reduce((a: number, v: number) => a * v);
  console.log(`Answer #2: ${answer}`);
};

const main = async () => {
  const trees = await getInputData();
  solvePartOne(trees);
  solvePartTwo(trees);
};

main();
