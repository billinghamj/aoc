import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');
const lines = inputRaw.split('\n').filter(Boolean);

const [length, ...more] = new Set(lines.map(l => l.length));

if (more.length)
	throw new Error('inconsistent line lengths');

let x = 0; // horizontal distance from top-left
let y = 0; // vertical distance from top-left
let treeCount = 0;

while (y < lines.length) {
	const value = lines[y][x % length];

	if (value === '#')
		treeCount += 1;

	x += 3;
	y += 1;
}

console.log(treeCount);
