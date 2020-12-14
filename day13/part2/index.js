import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const [, bussesRaw] = inputRaw
	.split('\n')
	.filter(Boolean);

const busses = bussesRaw
	.split(',')
	.map((b, i) => b === 'x' ? null : [i, parseInt(b, 10)])
	.filter(Boolean);

let result = 0;
let step = 1;

for (const [i, bus] of busses) {
	while ((result + i) % bus !== 0)
		result += step;

	step *= bus;
}

console.log(result);
