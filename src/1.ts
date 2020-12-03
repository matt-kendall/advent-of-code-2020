import './config';
import axios from 'axios';

const url = 'https://adventofcode.com/2020/day/1/input';

const getInputData = async () : Promise<number[]> => {
  const { data } = await axios.get(url);
  return data.split('\n').filter(Boolean).map(Number);
};

const pickNumbersWhichSumTo = (numbers: number[], sum: number) => (
  numbers.filter((n: number) => numbers.some((x: number) => x + n === sum))
);

const calculateAnswer = (part: number, matches: number[]) => {
  console.log(`Answer #${part}: ${matches} => ${matches.reduce((a, v) => a * v)}`);
};

const solvePartOne = (numbers: number[]) => {
  const matches = pickNumbersWhichSumTo(numbers, 2020);
  calculateAnswer(1, matches);
};

const solvePartTwo = (numbers: number[]) => {
  const matches = numbers.filter((n: number) => pickNumbersWhichSumTo(numbers, 2020 - n).length);
  calculateAnswer(2, matches);
};

const main = async () => {
  const numbers = await getInputData();
  solvePartOne(numbers);
  solvePartTwo(numbers);
};

main();
