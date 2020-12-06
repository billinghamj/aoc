import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const sum = inputRaw
	.toUpperCase()
	.trim()
	.split('\n\n')
	.map(g => g.split('\n'))
	.map(g => g
		.map(l => new Set(l.split('')))
		.reduce(intersect)
		.size
	).reduce((a, b) => a + b);

console.log(sum);

function intersect(a, b) {
	return new Set([...a].filter(x => b.has(x)))
}
