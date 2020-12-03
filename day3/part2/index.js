import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');
const lines = inputRaw.split('\n').filter(Boolean);

const [length, ...more] = new Set(lines.map(l => l.length));

if (more.length)
	throw new Error('inconsistent line lengths');

const iterations = [
	{ x: 1, y: 1 },
	{ x: 3, y: 1 },
	{ x: 5, y: 1 },
	{ x: 7, y: 1 },
	{ x: 1, y: 2 },
];

let treeCountProduct = 1;

for (const iteration of iterations) {
	let x = 0; // horizontal distance from top-left
	let y = 0; // vertical distance from top-left
	let treeCount = 0;

	while (y < lines.length) {
		const value = lines[y][x % length];

		if (value === '#')
			treeCount += 1;

		x += iteration.x;
		y += iteration.y;
	}

	treeCountProduct *= treeCount;
}

console.log(treeCountProduct);
