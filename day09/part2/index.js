import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const target = 373803594;

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => parseInt(l, 10));

a:
for (let j = 0; j < lines.length; j++) {
	for (let k = 0; k < lines.length; k++) {
		if (j >= k)
			continue;

		const set = lines.slice(j, k);
		const sum = set.reduce((a, b) => a + b);

		if (sum === target) {
			console.log(Math.min(...set) + Math.max(...set))
			break a;
		}
	}
}
