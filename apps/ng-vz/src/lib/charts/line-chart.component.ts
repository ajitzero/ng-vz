import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { Primitive } from 'd3-array';
import { DEFAULT_MARGINS } from '../constants';
import { MOCK_DATA } from '../mocks';
import type { MarginInput } from '../types';
import { CartesianChart } from './cartesian-chart';

@Component({
	selector: 'vz-line-chart',
	template: `
		<svg [attr.viewBox]="viewBox()" [attr.width]="width()" [attr.height]="height()" [style.margin]="marginStyle()">
			<title><ng-content select="[vzTitle]"></ng-content></title>
			<desc><ng-content select="[vzDesc]"></ng-content></desc>
			<defs>
				<clipPath>
					<rect [attr.height]="height()" [attr.width]="width()" x="5" y="5"></rect>
				</clipPath>
			</defs>

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
	public readonly data = input<Record<string, Primitive>[]>(MOCK_DATA);
	public readonly height = input(250);
	public readonly width = input(400);
	public readonly margin = input<MarginInput, Partial<MarginInput>>(DEFAULT_MARGINS, {
		transform: (value: Partial<MarginInput>) => ({ ...DEFAULT_MARGINS, ...value }),
	});

	protected readonly marginStyle = computed(() => {
		const margin = this.margin();
		return [margin.top, margin.right, margin.bottom, margin.left].map(value => `${value}px`).join(' ');
	});

	protected readonly hostStyle = computed(() => {
		const height = this.height();
		const width = this.width();
		return {
			display: 'block',
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
		const margin = this.margin();

		// Compute inner dimensions
		const innerWidth = Math.max(0, width - margin.left - margin.right);
		const innerHeight = Math.max(0, height - margin.top - margin.bottom);

		return { innerWidth, innerHeight };
	});
}
