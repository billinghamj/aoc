import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => parseInt(i, 10));

const count = 3;
const target = 2020;

if (lines.length > 256)
	throw new Error('solution incompatible with input');

for (let i = 0; i < 256 ** count; i++) {
	const indices = new Array(count).fill(null).map((_, n) => (i >> n * 8) % 256);

	if (indices.some(i => i >= lines.length))
		continue;

	if (new Set(indices).size !== count)
		continue;

	const result = indices.map(i => lines[i]);
	const sum = result.reduce((acc, cur) => acc + cur, 0);

	if (sum === target) {
		const product = result.reduce((acc, cur) => acc * cur, 1);

		console.log(product);
		break;
	}
}
