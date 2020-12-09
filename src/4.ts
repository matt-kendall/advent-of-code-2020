import './config';
import axios from 'axios';

const url = 'https://adventofcode.com/2020/day/4/input';

type PassportFieldValidator = (_fieldValue: string) => Boolean;

interface PassportField {
  required: Boolean,
  validate?: PassportFieldValidator;
}

interface Passport {
  byr: PassportField,
  iyr: PassportField,
  eyr: PassportField,
  hgt: PassportField,
  hcl: PassportField,
  ecl: PassportField,
  pid: PassportField,
  cid: PassportField,
}

const passportDefinition : Passport = {
  byr: {
    required: true,
    validate: (s: string) => s.length === 4 && Number(s) >= 1920 && Number(s) <= 2020,
  },
  iyr: {
    required: true,
    validate: (s: string) => s.length === 4 && Number(s) >= 2010 && Number(s) <= 2020,
  },
  eyr: {
    required: true,
    validate: (s: string) => s.length === 4 && Number(s) >= 2020 && Number(s) <= 2030,
  },
  hgt: {
    required: true,
    validate: (s: string) => {
      const match = s.match(/(cm|in)/);
      if (!match) { return false; }
      const units = match[0];
      const value = s.replace(units, '');
      const range = units === 'cm' ? [150, 193] : [59, 76];
      return Number(value) >= range[0] && Number(value) <= range[1];
    },
  },
  hcl: {
    required: true,
    validate: (s: string) => /^#([0-9]|[a-f]){6}$/.test(s),
  },
  ecl: {
    required: true,
    validate: (s: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(s),
  },
  pid: {
    required: true,
    validate: (s: string) => s.length === 9 && !!Number(s),
  },
  cid: {
    required: false,
  },
};

const getInputData = async () : Promise<string[]> => {
  const { data } = await axios.get(url);
  return data.split('\n\n');
};

const getPassportField = (passport: string, field: string) : string => passport
  .split(/\s+/)
  .find((s: string) => s.includes(field))
  .replace(`${field}:`, '');

const passportIsValid = (passport: string, detailedValidate: Boolean) : Boolean => (
  Object.entries(passportDefinition).every(([k, v] : [string, PassportField]) => (
    (!v.required) || (passport.includes(k) && (!detailedValidate || v.validate(getPassportField(passport, k))))
  ))
);

const solvePartOne = (passports: string[]) => {
  const validPassports = passports.filter((p: string) => passportIsValid(p, false));
  console.log(`Answer #1: ${validPassports.length}`);
};

const solvePartTwo = (passports: string[]) => {
  const validPassports = passports.filter((p: string) => passportIsValid(p, true));
  console.log(`Answer #2: ${validPassports.length}`);
};

const main = async () => {
  const passports = await getInputData();
  solvePartOne(passports);
  solvePartTwo(passports);
};

main();
