import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const fullSet = new Set(
	new Array(26)
		.fill(null)
		.map((_, i) => String.fromCharCode(65 + i))
);

const sum = inputRaw
	.toUpperCase()
	.trim()
	.split('\n\n')
	.map(g => g.split('\n'))
	.map(g => g
		.map(l => new Set(l.split('')))
		.reduce(intersect, fullSet)
		.size
	).reduce((acc, cur) => acc + cur, 0);

console.log(sum);

function intersect(a, b) {
	return new Set([...a].filter(x => b.has(x)))
}
