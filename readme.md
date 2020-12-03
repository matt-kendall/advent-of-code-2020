# Advent of Code scripts
This repo contains scripts (and therefore spoilers) for the 2020 Advent of Code challenges (https://adventofcode.com/).

## Running the scripts
### Installation
Install dependencies:
- Install Node, npm, npx
- `npm install`

### Configuration
To configure the scripts to be permitted access to the AdventOfCode protected resources (e.g. personalised input fields),
- Log in using a web browser
- Idenfity the session ID set in the cookie
- Edit `src/config.ts` to add the session token value to the file

### Running
Execute using ts-node to simultaneously compile the TypeScript and run with Node:
- `npx ts-node src/1.ts` (adjust for each day)