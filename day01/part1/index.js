import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(i => parseInt(i, 10));

a:
for (const n1 of lines) {
	for (const n2 of lines) {
		if (n1 + n2 === 2020) {
			console.log(n1 * n2);
			break a;
		}
	}
}
