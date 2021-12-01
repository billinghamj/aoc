import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const numbers = inputRaw
	.trim()
	.split(',')
	.map(i => parseInt(i, 10));

const spoken = new Array(2020);

spoken.splice(0, numbers.length, ...numbers);

for (let i = numbers.length; i < spoken.length; i++) {
	const lastSpoken = spoken[i - 1];
	const prevIndex = spoken.lastIndexOf(lastSpoken, i - 2);

	if (prevIndex === -1)
		spoken[i] = 0;
	else
		spoken[i] = i - 1 - prevIndex;
}

console.log(spoken[spoken.length - 1]);
