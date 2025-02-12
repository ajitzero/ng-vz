import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input } from '@angular/core';
import type { Primitive } from 'd3-array';
import { Line } from '../cartesian';
import { DEFAULT_GAPS } from '../constants';
import type { GapInput } from '../types';
import { CartesianChart } from './cartesian-chart';

@Component({
	selector: 'vz-line-chart',
	template: `
		<svg [attr.viewBox]="viewBox()" [attr.width]="width()" [attr.height]="height()">
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

	private lines = contentChildren(Line);

	protected readonly hostStyle = computed(() => {
		const height = this.height();
		const width = this.width();
		const gap = this.gap();

		const padding = [gap.top, gap.right, gap.bottom, gap.left].map(value => `${value}px`).join(' ');

		return {
			display: 'block',
			boxSizing: 'content-box',
			padding,
			width: '100%',
			height: '100%',
			maxHeight: `${height}px`,
			maxWidth: `${width}px`,
			outline: '1px solid #aaa',
		};
	});

	protected readonly viewBox = computed(() => `0 0 ${this.width()} ${this.height()}`);

	public readonly innerBounds = computed(() => {
		const width = this.width();
		const height = this.height();
		const gap = this.gap();
		// const lines = this.lines();

		// const pointRadius = Math.max(...lines.map(line => +line.strokeWidth()));
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
				line.width.set(this.width());
				line.height.set(this.height());
				line.innerBounds.set(this.innerBounds());
				line.data.set(this.data());
			}
		});
	}
}
