export interface Level {
	width: number;
	height: number;
	mines: number;
}

export interface Square {
	value: number;
	state: 'unknown' | 'flagged' | 'revealed';
}

export type Minefield = Square[][];

export type Point = [number, number];
export type Vector = [number, number];
