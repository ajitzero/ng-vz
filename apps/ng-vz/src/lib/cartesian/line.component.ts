import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { extent, Primitive } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { curveCatmullRom, line } from 'd3-shape';
import { DEFAULT_LINE_CHART_SETTINGS } from '../constants';
import { InnerBounds, LineChartSettings } from '../types';

@Component({
	selector: 'g[vzLine]',
	template: `
		<svg:path
			[attr.height]="height()"
			[attr.width]="width()"
			[attr.stroke]="stroke()"
			[attr.stroke-width]="strokeWidth()"
			[attr.d]="d()"
			[attr.stroke-linecap]="strokeLinecap()"
			[attr.stroke-linejoin]="strokeLinejoin()"
			[attr.stroke-dasharray]="strokeDasharray()"
			fill="none"
		></svg:path>
		@let _points = points();
		@if (_points.length) {
			<svg:g>
				@for (point of _points; track $index; let i = $index) {
					<circle
						[attr.cx]="point.cx"
						[attr.cy]="point.cy"
						[attr.height]="height()"
						[attr.width]="width()"
						[attr.stroke]="stroke()"
						[attr.stroke-width]="strokeWidth()"
						[attr.r]="hovering() - 1 === i ? activeDot() : '3'"
						(mouseover)="hovering.set(i + 1)"
						(mouseleave)="hovering.set(0)"
						(click)="clicked.emit(data()[i])"
						fill="#fff"
					></circle>
				}
			</svg:g>
		}
	`,
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
	public readonly strokeDasharray = input('', { alias: 'stroke-dasharray' });

	public readonly defaultDot = input(3);
	public readonly activeDot = input(3);
	public readonly clicked = output<Record<string, Primitive>>();
	protected readonly hovering = signal<number>(0);

	public readonly vzSettings = input<LineChartSettings, Partial<LineChartSettings>>(DEFAULT_LINE_CHART_SETTINGS, {
		transform: value => ({ ...DEFAULT_LINE_CHART_SETTINGS, ...value }),
	});

	private readonly base = computed(() => {
		const { innerWidth, innerHeight } = this.innerBounds();
		const data = this.data().map(item => item[this.dataKey()] as number);
		const pointRadiusDelta = 5;

		const xScale = scaleLinear()
			.domain([-0.05, data.length - 1])
			.range([pointRadiusDelta, innerWidth + pointRadiusDelta]);

		const maybeDomain = extent(data);
		const [domainMin, domainMax] = maybeDomain.some(v => v === undefined) ? [0, 1] : (maybeDomain as [number, number]);
		const buffer = (domainMax - domainMin) * 0.05;
		const yScale = scaleLinear()
			.domain([domainMin - buffer, domainMax + buffer])
			.range([innerHeight + pointRadiusDelta, pointRadiusDelta]);

		return { data, xScale, yScale };
	});

	protected readonly d = computed(() => {
		const { data, xScale, yScale } = this.base();
		const settings = this.vzSettings();

		let lineGenerator = line<number>()
			.x((_, i) => xScale(i))
			.y(d => yScale(d));

		if (!settings.skipSmoothing) {
			lineGenerator = lineGenerator.curve(curveCatmullRom);
		}

		return lineGenerator(data) ?? '';
	});

	protected readonly points = computed(() => {
		const { data, xScale, yScale } = this.base();

		return data.map((value, index) => ({
			cx: xScale(index),
			cy: yScale(value),
		}));
	});
}
