import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const records = inputRaw
	.trim()
	.split('\n\n')
	.map(l => l
		.split(/\s/)
		.map(x => x.split(':'))
		.reduce((acc, cur) => ({
			...acc,
			[cur[0]]: cur[1],
		}), {}));

const requiredFields = [
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid',
];

const valid = records.filter(r => requiredFields.every(f => r[f]));

console.log(valid.length);
