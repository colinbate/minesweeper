let values: Uint32Array | undefined;
const MAX = 32;
let count = MAX;
const LARGEST = 4294967296;

export function getRandomInt(upper: number) {
	if (values == null || count === 0) {
		values = new Uint32Array(MAX);
		crypto.getRandomValues(values);
		count = MAX;
	}
	count -= 1;
	const rnd = values[count] / LARGEST;
	return Math.floor(upper * rnd);
}

export function getRandom2DIndex(upperx: number, uppery: number): [number, number] {
	return [getRandomInt(upperx), getRandomInt(uppery)];
}
