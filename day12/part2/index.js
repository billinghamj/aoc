import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const regex = /^(?<opcode>[A-Z])(?<operand>\d+)$/;

const instructions = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => regex.exec(l).groups)
	.map(i => ({ ...i, operand: parseInt(i.operand, 10) }));

let shipX = 0; // horizontal - +ve east, -ve west
let shipY = 0; // vertical - +ve north, -ve south

// the "waypoint" is actually effectively a vector - it's relative to the ship
let waypointX = 10; // horizontal - +ve east, -ve west
let waypointY = 1; // vertical - +ve north, -ve south

for (const { opcode, operand } of instructions) {
	switch (opcode) {
		default:
			throw new Error('unrecognised opcode');

		case 'N':
			waypointY += operand;
			break;

		case 'S':
			waypointY -= operand;
			break;

		case 'E':
			waypointX += operand;
			break;

		case 'W':
			waypointX -= operand;
			break;

		case 'L': {
			const direction = angleFromShip() - operand;
			const magnitude = Math.sqrt(waypointX ** 2 + waypointY ** 2);

			waypointX = Math.sin(direction * Math.PI / 180) * magnitude;
			waypointY = Math.cos(direction * Math.PI / 180) * magnitude;
			break;
		}

		case 'R': {
			const direction = angleFromShip() + operand;
			const magnitude = Math.sqrt(waypointX ** 2 + waypointY ** 2);

			waypointX = Math.sin(direction * Math.PI / 180) * magnitude;
			waypointY = Math.cos(direction * Math.PI / 180) * magnitude;
			break;
		}

		case 'F': {
			const direction = angleFromShip();
			const magnitude = Math.sqrt(waypointX ** 2 + waypointY ** 2);
			const distance = magnitude * operand;

			shipX += Math.sin(direction * Math.PI / 180) * distance;
			shipY += Math.cos(direction * Math.PI / 180) * distance;
			break;
		}
	}
}

console.log(Math.round(Math.abs(shipX) + Math.abs(shipY)));

function angleFromShip() {
	return Math.atan2(waypointX, waypointY) / Math.PI * 180;
}
