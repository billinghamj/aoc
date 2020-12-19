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

const errorRate = nearbyTickets
	.map(t =>
		t
			.filter(v => !rangeMap[v])
			.reduce((a, b) => a + b, 0))
	.reduce((a, b) => a + b);

console.log(errorRate);

function parseInt10(i) {
	return parseInt(i, 10);
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
