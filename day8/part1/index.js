import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const regex = /^(?<opcode>[a-z]{3}) (?<operand>[+-]\d+)$/;

const instructions = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => regex.exec(i).groups)
	.map(i => ({ ...i, operand: parseInt(i.operand) }));

let acc = 0;
let pc = 0;

const visitedInstructions = new Set();

while (true) {
	if (pc >= instructions.length)
		break;

	if (visitedInstructions.has(pc))
		break;

	visitedInstructions.add(pc);

	const ins = instructions[pc];

	switch (ins.opcode) {
		case 'nop':
			break;

		case 'acc':
			acc += ins.operand;
			break;

		case 'jmp':
			pc += ins.operand;
			continue;

		default:
			throw new Error('unrecognised opcode');
	}

	pc += 1;
}

console.log(acc);
