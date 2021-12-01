import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const sum = inputRaw
	.trim()
	.split('\n\n')
	.reduce((acc, cur) => acc + new Set([...cur.match(/[a-z]/g)]).size, 0);

console.log(sum);
