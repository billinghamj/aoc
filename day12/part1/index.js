import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const regex = /^(?<opcode>[A-Z])(?<operand>\d+)$/;

const instructions = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => regex.exec(l).groups)
	.map(i => ({ ...i, operand: parseInt(i.operand, 10) }));

let x = 0; // horizontal - +ve east, -ve west
let y = 0; // vertical - +ve north, -ve south
let heading = 90; // degrees - 0 north, 90 east, 180 south, 270 west

for (const { opcode, operand } of instructions) {
	switch (opcode) {
		default:
			throw new Error('unrecognised opcode');

		case 'N':
			y += operand;
			break;

		case 'S':
			y -= operand;
			break;

		case 'E':
			x += operand;
			break;

		case 'W':
			x -= operand;
			break;

		case 'L':
			heading -= operand;
			break;

		case 'R':
			heading += operand;
			break;

		case 'F':
			x += Math.sin(heading * Math.PI / 180) * operand;
			y += Math.cos(heading * Math.PI / 180) * operand;
			break;
	}
}

console.log(Math.round(Math.abs(x) + Math.abs(y)));
