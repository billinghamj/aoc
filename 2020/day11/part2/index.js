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

				case Boolean(getSeat(i, j) === '#' && countAdjacent(i, j) >= 5):
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
		isOccupiedInDirection(row, column, -1, -1), // top left
		isOccupiedInDirection(row, column, -1, +0), // top middle
		isOccupiedInDirection(row, column, -1, +1), // top right
		isOccupiedInDirection(row, column, +0, -1), // middle left
		isOccupiedInDirection(row, column, +0, +1), // middle right
		isOccupiedInDirection(row, column, +1, -1), // bottom left
		isOccupiedInDirection(row, column, +1, +0), // bottom middle
		isOccupiedInDirection(row, column, +1, +1), // bottom right
	].map(Number).reduce((a, b) => a + b);
}

function isOccupiedInDirection(row, column, rowDirection, columnDirection) {
	for (let i = 1;; i++) {
		switch (getSeat(row + rowDirection * i, column + columnDirection * i)) {
			case '#':
				return true;

			case 'L':
				return false;

			case null:
				return false;

			case '.':
				break;

			default:
				throw new Error('unexpected seat contents');
		}
	}
}

function getSeat(row, column) {
	if (row < 0 || column < 0)
		return null;

	if (row > state.length - 1 || column > rowLength - 1)
		return null;

	return state[row][column];
}
