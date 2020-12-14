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
			for (const address of applyMask(operand.address, mask))
				mem[address] = operand.value;
			break;

		default:
			throw new Error('unknown opcode');
	}
}

console.log(Object.values(mem).reduce((a, b) => a + b));

function applyMask(address, mask) {
	if (!mask)
		return [address];

	const binAddress = address.toString(2).padStart(36, '0');
	const addresses = [''];

	for (let i = 0; i < mask.length; i++) {
		switch (mask[i]) {
			case '0':
				for (let j = 0; j < addresses.length; j++)
					addresses[j] += binAddress[i];
				break;

			case '1':
				for (let j = 0; j < addresses.length; j++)
					addresses[j] += '1';
				break;

			case 'X': {
				const additional = new Array(addresses.length);

				for (let j = 0; j < addresses.length; j++) {
					additional[j] = addresses[j] + '0';
					addresses[j] += '1';
				}

				addresses.push(...additional);
				break;
			}

			default:
				throw new Error('invalid mask');
		}
	}

	return addresses.map(a => parseInt(a, 2));
}
