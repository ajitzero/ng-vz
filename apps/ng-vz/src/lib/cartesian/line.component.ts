import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { extent, Primitive } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { curveCatmullRom, line } from 'd3-shape';
import { DEFAULT_LINE_CHART_SETTINGS } from '../constants';
import { DataPointClickEvent, InnerBounds, LineChartSettings } from '../types';

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
						(click)="clicked.emit({ data: data()[i], key: dataKey() })"
						stroke-dasharray="0"
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

	/**
	 * Data point identifier. Excepts this key to exist in `data`.
	 */
	public readonly dataKey = input.required<string>();

	// Inputs for forwarding SVG attributes
	// TODO: consider merging these into a single input.
	public readonly stroke = input('#000');
	public readonly strokeWidth = input('2', { alias: 'stroke-width' });
	public readonly strokeLinecap = input('round', { alias: 'stroke-linecap' });
	public readonly strokeLinejoin = input('round', { alias: 'stroke-linejoin' });
	public readonly strokeDasharray = input('', { alias: 'stroke-dasharray' });

	public readonly defaultDot = input(3);
	public readonly activeDot = input(3);

	public readonly clicked = output<DataPointClickEvent>();

	protected readonly hovering = signal<number>(0);

	/**
	 * TODO: support InjectionToken for this.
	 */
	public readonly vzSettings = input<LineChartSettings, Partial<LineChartSettings>>(DEFAULT_LINE_CHART_SETTINGS, {
		transform: value => ({ ...DEFAULT_LINE_CHART_SETTINGS, ...value }),
	});

	/**
	 * Common logic for all charts.
	 */
	private readonly base = computed(() => {
		const { innerWidth, innerHeight } = this.innerBounds();
		const data = this.data().map(item => item[this.dataKey()] as number);
		/**
		 * This added for shifting the point radius, which gets cut off on either end.
		 * TODO: Find a better way to do this.
		 */
		const pointRadiusDelta = 5;

		const xScale = scaleLinear()
			.domain([-0.05, data.length - 1])
			.range([pointRadiusDelta, innerWidth + pointRadiusDelta]);

		const [domainMin = 0, domainMax = 1] = extent(data);
		const buffer = (domainMax - domainMin) * 0.05;
		const yScale = scaleLinear()
			.domain([domainMin - buffer, domainMax + buffer])
			.range([innerHeight + pointRadiusDelta, pointRadiusDelta]);

		return { data, xScale, yScale };
	});

	/**
	 * Line's path value.
	 */
	protected readonly d = computed(() => {
		const { data, xScale, yScale } = this.base();
		const settings = this.vzSettings();

		let lineGenerator = line<number>()
			.x((_, i) => xScale(i))
			.y(d => yScale(d));

		if (settings.enableSmoothing) {
			lineGenerator = lineGenerator.curve(curveCatmullRom);
		}

		return lineGenerator(data) ?? '';
	});

	/**
	 * Line's points, Required for hovering.
	 */
	protected readonly points = computed(() => {
		const { data, xScale, yScale } = this.base();

		return data.map((value, index) => ({
			cx: xScale(index),
			cy: yScale(value),
		}));
	});
}
