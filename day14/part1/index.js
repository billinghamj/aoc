import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const maskRegex = /^mask = (?<mask>[01X]{36})$/;
const memRegex = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/;

const instructions = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => {
		const maskMatch = maskRegex.exec(l);
		const memMatch = memRegex.exec(l);

		if (maskMatch) {
			return {
				opcode: 'mask',
				operand: maskMatch.groups.mask,
			};
		}

		if (memMatch) {
			return {
				opcode: 'mem',
				operand: {
					address: parseInt(memMatch.groups.address, 10),
					value: parseInt(memMatch.groups.value, 10),
				},
			};
		}

		throw new Error('unrecognised instruction');
	});

const mem = {};
let mask = null;

for (const { opcode, operand } of instructions) {
	switch (opcode) {
		case 'mask':
			mask = operand;
			break;

		case 'mem':
			mem[operand.address] = applyMask(operand.value, mask);
			break;

		default:
			throw new Error('unknown opcode');
	}
}

console.log(Object.values(mem).reduce((a, b) => a + b));

function applyMask(value, mask) {
	if (!mask)
		return value;

	const newBinary = value
		.toString(2)
		.padStart(36, '0')
		.replace(/./g, (n, i) => mask[i] === 'X' ? n : mask[i]);

	return parseInt(newBinary, 2);
}
