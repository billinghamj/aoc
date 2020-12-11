import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

let state = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => l.split(''));

const [rowLength, ...more] = new Set(state.map(r => r.length));

if (more.length)
	throw new Error('inconsistent row lengths');

let lastStateCollapsed = null;

while (true) {
	const newState = [...state.map(r => [...r])];

	for (let i = 0; i < state.length; i++) {
		for (let j = 0; j < rowLength; j++) {
			switch (true) {
				case Boolean(getSeat(i, j) === 'L' && countAdjacent(i, j) === 0):
					newState[i][j] = '#';
					break;

				case Boolean(getSeat(i, j) === '#' && countAdjacent(i, j) >= 4):
					newState[i][j] = 'L';
					break;
			}
		}
	}

	const collapsed = collapseState(newState);

	if (collapsed === lastStateCollapsed)
		break;

	state = newState;
	lastStateCollapsed = collapsed;
}

const occupancy = collapseState(state)
	.split('')
	.filter(c => c === '#')
	.length;

console.log(occupancy);

function collapseState(state) {
	return state
		.map(r => r.join(''))
		.join('');
}

function countAdjacent(row, column) {
	return [
		getSeat(row - 1, column - 1) === '#', // top left
		getSeat(row - 1, column + 0) === '#', // top middle
		getSeat(row - 1, column + 1) === '#', // top right
		getSeat(row + 0, column - 1) === '#', // middle left
		getSeat(row + 0, column + 1) === '#', // middle right
		getSeat(row + 1, column - 1) === '#', // bottom left
		getSeat(row + 1, column + 0) === '#', // bottom middle
		getSeat(row + 1, column + 1) === '#', // bottom right
	].map(Number).reduce((a, b) => a + b);
}

function getSeat(row, column) {
	if (row < 0 || column < 0)
		return null;

	if (row > state.length - 1 || column > rowLength - 1)
		return null;

	return state[row][column];
}
