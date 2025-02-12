import type { Signal } from '@angular/core';
import type { Primitive } from 'd3-array';
import type { GapInput, InnerBounds } from '../types';

export abstract class CartesianChart {
	public readonly height!: Signal<number>;
	public readonly width!: Signal<number>;
	public readonly data!: Signal<Record<string, Primitive>[]>;
	public readonly gap!: Signal<GapInput>;
	public readonly innerBounds!: Signal<InnerBounds>;
}
