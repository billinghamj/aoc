import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => parseInt(i, 10));

const window = [
	lines.shift(),
	lines.shift(),
	lines.shift(),
];

let prev = window[0] + window[1] + window[2];
let incCount = 0;

for (const i of lines) {
	window.shift();
	window.push(i);

	const curr = window[0] + window[1] + window[2];

	if (curr > prev)
		incCount++;

	prev = curr;
}

console.log(incCount);
