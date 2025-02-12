import type { Signal, WritableSignal } from '@angular/core';
import type { Primitive } from 'd3-array';
import type { GapInput, InnerBounds } from '../types';

/**
 * Base cartesian chart requirements
 */
export abstract class CartesianChart {
	/**
	 * Data Source
	 */
	public readonly data!: Signal<Record<string, Primitive>[]>;

	/**
	 * Initial height of the chart
	 */
	public readonly height!: Signal<number>;
	/**
	 * Initial width of the chart
	 */
	public readonly width!: Signal<number>;
	/**
	 * These are used to allow the chart to be resized dynamically.
	 *
	 * @internal
	 */
	public readonly _height!: WritableSignal<number>;
	/**
	 * These are used to allow the chart to be resized dynamically.
	 *
	 * @internal
	 */
	public readonly _width!: WritableSignal<number>;
	/**
	 * Optional. Gap between the chart and the edges of the container
	 *
	 * @default 10
	 */
	public readonly gap!: Signal<GapInput>;
	/**
	 * @internal
	 */
	public readonly innerBounds!: Signal<InnerBounds>;
}
