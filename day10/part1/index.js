import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => parseInt(l, 10))
	.sort((a, b) => a - b);

const diffs = {
	3: 1, // for the built-in adaptor
};

let lastLine = 0;

for (const line of lines) {
	const diff = line - lastLine;

	diffs[diff] = (diffs[diff] ?? 0) + 1;

	lastLine = line;
}

console.log(diffs[1] * diffs[3]);
