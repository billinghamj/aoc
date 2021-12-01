import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const lines = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => parseInt(l, 10));

for (let i = 25; i < lines.length; i++) {
	let found = false;

	a:
	for (let j = i - 25; j < i; j++) {
		for (let k = i - 25; k < i; k++) {
			if (j === k)
				continue;

			if (lines[i] === lines[j] + lines[k]) {
				found = true;
				break a;
			}
		}
	}

	if (!found) {
		console.log(lines[i]);
		break;
	}
}
