import { DIRECTIONS, bfwalk, movePoint, toToken } from './bfwalk';
import { getRandom2DIndex } from './random';
import type { Level, Minefield, Point, Square } from './types';

function getNMines(level: Level, exclude: string) {
	const mines = new Set<string>();
	while (mines.size < level.mines) {
		const pt = getRandom2DIndex(level.width, level.height);
		const token = toToken(pt);
		if (mines.has(token) || token === exclude) continue;
		mines.add(token);
	}
	return mines;
}

function getNearbyMineCount(mines: Set<string>, x: number, y: number) {
	let total = 0;
	for (const dir of DIRECTIONS) {
		const neighbour = movePoint(x, y, dir);
		if (mines.has(toToken(neighbour))) {
			total += 1;
		}
	}
	return total;
}

export function createMinefield(level: Level) {
	const field: Minefield = $state([]);

	for (let y = 0; y < level.height; y += 1) {
		const row = $state([]);
		field.push(row);
		for (let x = 0; x < level.width; x += 1) {
			const tile = $state({
				state: 'unknown',
				value: 0
			} as Square);
			field[y].push(tile);
		}
	}
	return field;
}

export function fillInMines(field: Minefield, pt: Point, mines: number) {
	const height = field.length;
	const width = field[0].length;
	const placed = getNMines({ mines, height, width }, toToken(pt));

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			const token = toToken([x, y]);
			field[y][x].value = placed.has(token) ? -1 : getNearbyMineCount(placed, x, y);
		}
	}
}

export function clearSafeArea(field: Minefield, [x, y]: Point) {
	bfwalk(field, [x, y], (sq) => {
		sq.state = 'revealed';
		return sq.value === 0;
	});
}

export function flagCount(field: Minefield) {
	const height = field.length;
	const width = field[0].length;
	let flags = 0;

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			if (field[y][x].state === 'flagged') flags += 1;
		}
	}
	return flags;
}

export function gameState(field: Minefield, mines: number) {
	const height = field.length;
	const width = field[0].length;
	let safe = 0;

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			if (field[y][x].state === 'revealed') {
				if (field[y][x].value === -1) return 'lose';
			} else {
				safe += 1;
			}
		}
	}
	return safe === mines ? 'win' : 'none';
}
