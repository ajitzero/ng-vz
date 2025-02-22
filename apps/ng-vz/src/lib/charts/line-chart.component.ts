import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	effect,
	input,
	linkedSignal,
} from '@angular/core';
import type { Primitive } from 'd3-array';
import { Line } from '../cartesian';
import { DEFAULT_GAPS } from '../constants';
import type { GapInput } from '../types';
import { BaseCartesianChart } from './cartesian-chart';

@Component({
	selector: 'vz-cartesian-chart',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<svg [attr.viewBox]="viewBox()" [attr.width]="finalWidth()" [attr.height]="finalHeight()">
			<svg:title><ng-content select="[vzTitle]"></ng-content></svg:title>
			<svg:desc><ng-content select="[vzDesc]"></ng-content></svg:desc>

			<!-- Users are expected to explicitly provide g[vzLine] elements here. -->
			<ng-content></ng-content>
		</svg>
	`,
	host: {
		'[style]': 'hostStyle()',
	},
})
export class CartesianChart implements BaseCartesianChart {
	/**
	 * @internal
	 */
	private readonly lines = contentChildren(Line);
	/**
	 * Data Source.
	 */
	public readonly data = input.required<Record<string, Primitive>[]>();
	/**
	 * Initial height of the chart, in pixels. Includes padding.
	 * @see gap
	 */
	public readonly height = input.required<number>();
	/**
	 * Initial width of the chart, in pixels. Includes padding.
	 * @see gap
	 */
	public readonly width = input.required<number>();
	/**
	 * Gap between the chart and the edges of the container, also called padding. Optional.
	 *
	 * @default 10
	 */
	public readonly gap = input<GapInput, Partial<GapInput> | number>(DEFAULT_GAPS, {
		transform: (value: Partial<GapInput> | number) => {
			if (typeof value === 'number') {
				return { top: value, right: value, bottom: value, left: value };
			}
			return { ...DEFAULT_GAPS, ...value };
		},
	});
	/**
	 * These are used to allow the chart to be resized dynamically.
	 *
	 * @see ResponsiveContainer
	 *
	 * @internal
	 */
	public readonly linkedHeight = linkedSignal(() => this.height());
	/**
	 * These are used to allow the chart to be resized dynamically.
	 *
	 * @see ResponsiveContainer
	 *
	 * @internal
	 */
	public readonly linkedWidth = linkedSignal(() => this.width());
	/**
	 * @internal
	 */
	protected readonly finalHeight = computed(() => {
		const height = this.linkedHeight();
		const gap = this.gap();

		return height - gap.top - gap.bottom;
	});
	/**
	 * @internal
	 */
	public readonly finalWidth = computed(() => {
		const width = this.linkedWidth();
		const gap = this.gap();

		return width - gap.left - gap.right;
	});
	/**
	 * @internal
	 */
	protected readonly hostStyle = computed(() => {
		const height = this.linkedHeight();
		const width = this.linkedWidth();
		const gap = this.gap();

		return {
			display: 'block',
			height: '100%',
			width: '100%',
			maxHeight: `${height}px`,
			maxWidth: `${width}px`,
			padding: [gap.top, gap.right, gap.bottom, gap.left].map(value => `${value}px`).join(' '),
		};
	});
	/**
	 * @internal
	 */
	protected readonly viewBox = computed(() => {
		const height = this.finalHeight();
		const width = this.finalWidth();

		return `0 0 ${width} ${height}`;
	});
	/**
	 * @internal
	 */
	public readonly innerBounds = computed(() => {
		const width = this.finalWidth();
		const height = this.finalHeight();
		const gap = this.gap();

		const innerWidth = Math.max(0, width - gap.left - gap.right);
		const innerHeight = Math.max(0, height - gap.top - gap.bottom);

		return { innerWidth, innerHeight };
	});

	constructor() {
		effect(() => {
			const lines = this.lines();
			if (lines.length === 0) {
				return;
			}

			for (const line of lines) {
				line.width.set(this.finalWidth());
				line.height.set(this.finalHeight());
				line.innerBounds.set(this.innerBounds());
				line.data.set(this.data());
			}
		});
	}
}
