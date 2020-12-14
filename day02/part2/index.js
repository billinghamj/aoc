import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const regex = /^(?<pos1>\d+)-(?<pos2>\d+) (?<letter>[a-z]): (?<password>[a-z]+)$/;

const passwords = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => regex.exec(l).groups)
	.map(p => ({
		...p,
		pos1: parseInt(p.pos1, 10),
		pos2: parseInt(p.pos2, 10),
	}));

const valid = passwords.filter(p => {
	if (p.pos1 > p.password.length || p.pos2 > p.password.length)
		return false;

	const match1 = p.password[p.pos1 - 1] === p.letter;
	const match2 = p.password[p.pos2 - 1] === p.letter;

	return match1 ^ match2;
});

console.log(valid.length);
