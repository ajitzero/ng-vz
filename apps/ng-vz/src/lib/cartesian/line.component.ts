import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { extent, Primitive } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { InnerBounds } from '../types';

@Component({
	selector: 'g[vzLine]',
	template: `
		<svg:path
			[attr.height]="height()"
			[attr.width]="width()"
			[attr.stroke]="stroke()"
			[attr.stroke-width]="strokeWidth()"
			[attr.d]="d()"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		></svg:path>
		@let _points = points();
		@if (_points.length) {
			<svg:g class="recharts-layer recharts-line-dots">
				@for (point of _points; track $index) {
					<circle
						class="recharts-dot recharts-line-dot"
						[attr.cx]="point.cx"
						[attr.cy]="point.cy"
						[attr.height]="height()"
						[attr.width]="width()"
						[attr.stroke]="stroke()"
						[attr.stroke-width]="strokeWidth()"
						r="3"
						fill="#fff"
					></circle>
				}
			</svg:g>
		}
	`,
	host: {
		style: 'display: contents',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Line {
	public readonly width = signal<number>(0);
	public readonly height = signal<number>(0);
	public readonly innerBounds = signal<InnerBounds>({ innerHeight: 0, innerWidth: 0 });
	public readonly data = signal<Record<string, Primitive>[]>([]);

	public readonly dataKey = input.required<string>();

	public readonly stroke = input('#000');
	public readonly strokeWidth = input('2', { alias: 'stroke-width' });
	public readonly strokeLinecap = input('round', { alias: 'stroke-linecap' });
	public readonly strokeLinejoin = input('round', { alias: 'stroke-linejoin' });

	private readonly base = computed(() => {
		const { innerWidth, innerHeight } = this.innerBounds();
		const data = this.data().map(item => item[this.dataKey()] as number);
		const pointRadiusDelta = 10;

		const xScale = scaleLinear()
			.domain([0, data.length - 1])
			.range([pointRadiusDelta, innerWidth + pointRadiusDelta]);

		const maybeDomain = extent(data);
		const domain = maybeDomain.some(v => v === undefined) ? [0, 1] : (maybeDomain as [number, number]);
		const yScale = scaleLinear()
			.domain(domain)
			.range([innerHeight + pointRadiusDelta, pointRadiusDelta]);

		return { data, xScale, yScale };
	});

	protected readonly d = computed(() => {
		const { data, xScale, yScale } = this.base();

		// Generate line path
		const lineGenerator = line<number>()
			.x((_, i) => xScale(i))
			.y(d => yScale(d));

		return lineGenerator(data) ?? '';
	});

	protected readonly points = computed(() => {
		const { data, xScale, yScale } = this.base();

		return data.map((d, i) => ({
			cx: xScale(i),
			cy: yScale(d),
		}));
	});
}
