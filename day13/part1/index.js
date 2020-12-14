import fs from 'fs/promises';

const inputRaw = await fs.readFile('../input', 'utf8');

const [timeRaw, bussesRaw] = inputRaw
	.split('\n')
	.filter(Boolean);

const time = parseInt(timeRaw, 10);

const busses = bussesRaw
	.split(',')
	.filter(b => b !== 'x')
	.map(b => parseInt(b, 10));

const remainingTimes = busses
	.map(b => ({ id: b, waitTime: b - (time % b) }))
	.sort((a, b) => a.waitTime - b.waitTime);

const fastest = remainingTimes[0];

console.log(fastest.id * fastest.waitTime);
