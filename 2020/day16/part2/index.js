import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const baseRegex = /^((?:[a-z ]+: \d+-\d+ or \d+-\d+\n)+)\nyour ticket:\n(\d+(?:,\d+)+)\n\nnearby tickets:\n((?:\d+(?:,\d+)+\n)+)$/;
const fieldRegex = /^(?<name>[a-z ]+): (?<r1From>\d+)-(?<r1To>\d+) or (?<r2From>\d+)-(?<r2To>\d+)$/;

const [, fieldsRaw, myTicketRaw, nearbyTicketsRaw] = baseRegex.exec(inputRaw);

const fields = fieldsRaw
	.split('\n')
	.filter(Boolean)
	.map(parseField);

const myTicket = myTicketRaw.split(',').map(parseInt10);

const nearbyTickets = nearbyTicketsRaw
	.split('\n')
	.filter(Boolean)
	.map(l => l.split(',').map(parseInt10));

const allTickets = [myTicket, ...nearbyTickets];
const [length, ...more] = new Set(allTickets.map(t => t.length));

if (more.length)
	throw new Error('inconsistent field length');

const allRanges = [].concat(...fields.map(f => f.ranges));
const maxRange = Math.max(...allRanges.map(r => r.to));
const rangeMap = new Array(maxRange + 1);

for (const { name, ranges } of fields) {
	for (const { from, to } of ranges) {
		for (let i = from; i <= to; i++) {
			if (!rangeMap[i])
				rangeMap[i] = new Set();

			rangeMap[i].add(name);
		}
	}
}

const departureFields = fields.map(f => f.name).filter(n => n.startsWith('departure '));
const validNearbyTickets = nearbyTickets.filter(t => t.every(v => rangeMap[v]));
const allValidTickets = [myTicket, ...validNearbyTickets];

const possibleMatches = new Array(length)
	.fill(null)
	.map((_, i) => allValidTickets.map(t => rangeMap[t[i]]).reduce(intersect));

while (possibleMatches.some(m => m.size !== 1)) {
	const singles = possibleMatches.filter(m => m.size === 1);

	for (const single of singles) {
		for (const matches of possibleMatches) {
			if (matches.size !== 1)
				matches.delete(Array.from(single)[0]);
		}
	}
}

const result = possibleMatches
	.map((m, i) => ({
		name: Array.from(m)[0],
		index: i,
	}))
	.filter(f => departureFields.includes(f.name))
	.map(c => myTicket[c.index])
	.reduce((a, b) => a * b);

console.log(result);

function parseInt10(i) {
	return parseInt(i, 10);
}

function intersect(a, b) {
	return new Set([...a].filter(x => b.has(x)))
}

function parseField(fieldRaw) {
	const { name, r1From, r1To, r2From, r2To } = fieldRegex.exec(fieldRaw).groups;

	const ranges = [
		{ from: parseInt10(r1From), to: parseInt10(r1To) },
		{ from: parseInt10(r2From), to: parseInt10(r2To) },
	];

	for (const { from, to } of ranges) {
		if (from >= to)
			throw new Error('invalid range');
	}

	return {
		name,
		ranges,
	};
}
