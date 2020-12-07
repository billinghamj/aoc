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
	.filter(b => b.bag !== target)
	.reduce((acc, { bag, capacity }) => ({
		...acc,
		[bag]: capacity,
	}), {});

let lastCount = 0;
let targets = [target];

while (lastCount < targets.length) {
	lastCount = targets.length;

	targets = search([...targets, target]);
}

console.log(targets.length);

function search(targets) {
	return Object.keys(bags).filter(b => targets.some(t => bags[b][t]));
}
