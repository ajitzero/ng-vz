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
import { CartesianChart } from './cartesian-chart';

@Component({
	selector: 'vz-line-chart',
	template: `
		<svg [attr.viewBox]="viewBox()" [attr.width]="__width()" [attr.height]="__height()">
			<svg:title><ng-content select="[vzTitle]"></ng-content></svg:title>
			<desc><ng-content select="[vzDesc]"></ng-content></desc>

			<!-- Users are expected to explicitly provide g[vzLine] elements here. -->
			<ng-content></ng-content>
		</svg>
	`,
	host: {
		'[style]': 'hostStyle()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChart implements CartesianChart {
	public readonly data = input.required<Record<string, Primitive>[]>();

	public readonly height = input.required<number>();
	public readonly width = input.required<number>();
	public readonly gap = input<GapInput, Partial<GapInput> | number>(DEFAULT_GAPS, {
		transform: (value: Partial<GapInput> | number) => {
			if (typeof value === 'number') {
				return { top: value, right: value, bottom: value, left: value };
			}
			return { ...DEFAULT_GAPS, ...value };
		},
	});

	public readonly _height = linkedSignal(() => this.height());
	public readonly _width = linkedSignal(() => this.width());

	public readonly __height = computed(() => {
		const height = this._height();
		const gap = this.gap();

		return height - gap.top - gap.bottom;
	});
	public readonly __width = computed(() => {
		const width = this._width();
		const gap = this.gap();

		return width - gap.left - gap.right;
	});

	private lines = contentChildren(Line);

	protected readonly hostStyle = computed(() => {
		const height = this._height();
		const width = this._width();
		const gap = this.gap();

		return {
			display: 'block',
			padding: [gap.top, gap.right, gap.bottom, gap.left].map(value => `${value}px`).join(' '),
			width: '100%',
			height: '100%',
			maxHeight: `${height}px`,
			maxWidth: `${width}px`,
		};
	});

	protected readonly viewBox = computed(() => {
		const height = this.__height();
		const width = this.__width();

		return `0 0 ${width} ${height}`;
	});

	public readonly innerBounds = computed(() => {
		const width = this.__width();
		const height = this.__height();
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
				line?.width?.set(this.__width());
				line?.height?.set(this.__height());
				line?.innerBounds?.set(this.innerBounds());
				line?.data?.set(this.data());
			}
		});
	}
}
