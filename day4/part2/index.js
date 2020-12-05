import fs from 'fs/promises';
import validator from 'is-my-json-valid';
import { parseRecord } from './parsing.js';

const inputRaw = await fs.readFile('../input', 'utf8');

const jsonSchema = await fs.readFile('./schema.json', 'utf8');
const validate = validator(jsonSchema);

const valid = inputRaw
	.trim()
	.split('\n\n')
	.map(tryOrNull(parseRecord))
	.filter(Boolean)
	.filter(validate);

console.log(valid.length);

function tryOrNull(fn) {
	return (...args) => {
		try {
			return fn(...args);
		} catch (e) {
			return null;
		}
	};
}
