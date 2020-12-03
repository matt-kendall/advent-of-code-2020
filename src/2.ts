import './config';
import axios from 'axios';

const url = 'https://adventofcode.com/2020/day/2/input';

interface PasswordPolicy {
  min: number;
  max: number;
  letter: string;
}

interface Password {
  policy: PasswordPolicy;
  value: string;
}

const getInputData = async () : Promise<Password[]> => {
  const { data } = await axios.get(url);
  return data.split('\n').filter(Boolean).map((s: string) => {
    const [numRangeString, letterString, value] = s.split(' ');
    const [min, max] = numRangeString.split('-').map(Number);
    const letter = letterString.replace(':', '');

    return {
      policy: {
        min,
        max,
        letter,
      },
      value,
    };
  });
};

const checkLetterCountInRange = (password: Password) : Boolean => {
  const { min, max, letter } = password.policy;
  const letterCount = password.value.split('').filter((c: string) => c === letter).length;
  return min <= letterCount && letterCount <= max;
};

const checkSingleLetterInPositions = (password: Password) : Boolean => {
  const { min, max, letter } = password.policy;
  return password.value.split('').filter((s: string, i: number) => [min, max].includes(i + 1) && s === letter).length === 1;
};

const calculateAnswer = (passwords: Password[], checkValid: (_p: Password) => Boolean, part: number) => {
  const validCount = passwords.filter(checkValid).length;
  console.log(`Answer #${part}: ${validCount} passwords valid`);
};

const solvePartOne = (passwords: Password[]) => {
  calculateAnswer(passwords, checkLetterCountInRange, 1);
};

const solvePartTwo = (passwords: Password[]) => {
  calculateAnswer(passwords, checkSingleLetterInPositions, 2);
};

const main = async () => {
  const passwords = await getInputData();
  solvePartOne(passwords);
  solvePartTwo(passwords);
};

main();
