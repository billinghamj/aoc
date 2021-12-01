import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => parseInt(l, 10))
	.sort((a, b) => a - b);

const fullSet = [
	...lines,
	lines[lines.length - 1] + 3,
];

const res = fullSet.reduce((acc, n) =>
	acc.set(n, (
		(acc.get(n - 1) ?? 0) +
		(acc.get(n - 2) ?? 0) +
		(acc.get(n - 3) ?? 0)
	)),
	new Map([[0, 1]]),
);

console.log(res.get(Math.max(...res.keys())));
