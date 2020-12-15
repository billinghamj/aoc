import donhash from 'donhash';
import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const iterations = 30000000;

const numbers = inputRaw
	.trim()
	.split(',')
	.map(i => parseInt(i, 10));

let lastSpoken;
const spokenMap = new donhash.HashMap({ initialTableSize: iterations });

for (let i = 0; i < numbers.length; i++) {
	lastSpoken = numbers[i];
	spokenMap.insert(lastSpoken, i);
}

let prevIndex;

for (let i = numbers.length; i < iterations; i++) {
	lastSpoken = prevIndex == null ? 0 : i - 1 - prevIndex;
	prevIndex = spokenMap.get(lastSpoken);
	spokenMap.insert(lastSpoken, i);
}

console.log(lastSpoken);
