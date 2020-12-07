import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const target = 'shiny gold';

const baseRegex = /^(?<bag>[a-z]+ [a-z]+) bags contain (?:no other bags|(?<capacityRaw>.+))\.$/;
const capacityRegex = /(?:^|, )(?<count>\d) (?<bag>[a-z]+ [a-z]+) bags?/g;

const bags = inputRaw
	.split('\n')
	.filter(Boolean)
	.map(l => {
		const { groups: { bag, capacityRaw } } = baseRegex.exec(l);

		const matches = Array.from((capacityRaw ?? '').matchAll(capacityRegex));

		return {
			bag,
			capacity: matches.reduce((acc, { groups: { bag, count } }) => ({
				...acc,
				[bag]: parseInt(count, 10),
			}), {}),
		};
	})
	.reduce((acc, { bag, capacity }) => ({
		...acc,
		[bag]: capacity,
	}), {});

function countInnerBags(target) {
	const capacity = bags[target];

	return Object
		.keys(capacity)
		.map(b => (countInnerBags(b) + 1) * capacity[b])
		.reduce((a, b) => a + b, 0);
}

console.log(countInnerBags(target));
