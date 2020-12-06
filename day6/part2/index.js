import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const sum = inputRaw
	.trim()
	.split('\n\n')
	.map(g => g.split('\n'))
	.map(g =>
		Object.values(g
			.map(l => [...new Set(l.split(''))])
			.flat()
			.reduce((acc, cur) => ({
				...acc,
				[cur]: (acc[cur] ?? 0) + 1,
			}), {})
		).filter(v => v === g.length).length
	).reduce((acc, cur) => acc + cur, 0);

console.log(sum);
