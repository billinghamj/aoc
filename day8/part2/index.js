import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const regex = /^(?<opcode>[a-z]{3}) (?<operand>[+-]\d+)$/;

const origInstructions = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => regex.exec(i).groups)
	.map(i => ({ ...i, operand: parseInt(i.operand) }));


for (let i = 0; i < origInstructions.length; i++) {
	const ins = origInstructions[i];
	let newOpcode;

	switch (ins.opcode) {
		case 'nop':
			newOpcode = 'jmp';
			break;

		case 'jmp':
			newOpcode = 'nop';
			break;

		default:
			continue;
	}

	const instructions = [...origInstructions];

	instructions[i] = {
		...ins,
		opcode: newOpcode,
	};

	try {
		console.log(run(instructions));
	} catch (e) {}
}

function run(instructions) {
	let acc = 0;
	let pc = 0;

	const visitedInstructions = new Set();

	while (true) {
		if (pc >= instructions.length)
			break;

		if (visitedInstructions.has(pc))
			throw new Error('infinite loop');

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

	return acc;
}
