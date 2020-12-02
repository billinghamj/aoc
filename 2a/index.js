import fs from 'fs/promises';

const inputRaw = await fs.readFile('./input', 'utf8');

const regex = /^(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)$/;

const passwords = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => regex.exec(l).groups)
	.map(p => ({
		...p,
		min: parseInt(p.min, 10),
		max: parseInt(p.max, 10),
	}));

const valid = passwords.filter(p => {
	let n = 0;

	for (let i = 0; i < p.password.length; i++) {
		if (p.password[i] === p.letter)
			n += 1;
	}

	return n >= p.min && n <= p.max;
});

console.log(valid.length);
