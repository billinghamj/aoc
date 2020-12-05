export function parseRecord(input) {
	return input
		.split(/\s/)
		.map(x => x.split(':'))
		.reduce((acc, cur) => ({
			...acc,
			[cur[0]]: parseField(cur[0], cur[1]),
		}), {});
}

const parseDecimalInt = i => parseInt(i, 10);

const fields = {
	byr: parseDecimalInt,
	iyr: parseDecimalInt,
	eyr: parseDecimalInt,
	hgt: parseHeight,
	hcl: String,
	ecl: String,
	pid: String,
	cid: parseDecimalInt,
};

function parseField(field, input) {
	const parser = fields[field];

	if (!parser)
		throw new Error('invalid field');

	return parser(input);
}

const heightRegex = /^(?<value>\d+)(?<unit>cm|in)$/;

function parseHeight(input) {
	if (!input)
		throw new Error('invalid height');

	const result = heightRegex.exec(input);

	if (!result)
		throw new Error('invalid height');

	return {
		[result.groups.unit]: parseDecimalInt(result.groups.value),
	};
}
