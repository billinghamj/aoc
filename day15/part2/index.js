import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const numbers = inputRaw
	.trim()
	.split(',')
	.map(i => parseInt(i, 10));

let lastSpoken;
const spokenMap = {};

for (let i = 0; i < numbers.length; i++) {
	lastSpoken = numbers[i];
	spokenMap[lastSpoken] = i;
}

let prevIndex;

for (let i = numbers.length; i < 30000000; i++) {
	lastSpoken = prevIndex == null ? 0 : i - 1 - prevIndex;
	prevIndex = spokenMap[lastSpoken];
	spokenMap[lastSpoken] = i;
}

console.log(lastSpoken);
