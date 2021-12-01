import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => parseInt(i, 10));

let prev = lines.shift();
let incCount = 0;

for (const i of lines) {
	if (i > prev)
		incCount++;

	prev = i;
}

console.log(incCount);
