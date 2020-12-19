import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean);

console.log(lines);
