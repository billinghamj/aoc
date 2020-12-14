import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const seats = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(s => decodeSeatPosition(s).seatId)
	.sort((a, b) => a - b);

let lastSeat = null;

for (const seat of seats) {
	if (seat === lastSeat + 2) {
		console.log(lastSeat + 1);
		break;
	}

	lastSeat = seat;
}

function decodeSeatPosition(input) {
	if (input.length !== 10)
		throw new Error('invalid seat');

	const row = decodeInt(input.substr(0, 7), 'B');
	const column = decodeInt(input.substr(7, 3), 'R');

	return {
		row,
		column,
		seatId: row * 8 + column,
	};
}

function decodeInt(input, higherVal) {
	return input
		.split('')
		.reduce((acc, cur) => (acc << 1) + Number(cur === higherVal), 0);
}
