import { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Primitive } from 'd3-array';
import { Line, LineChart, ResponsiveContainer } from 'ng-vz';
import { MOCK_DATA } from '../../mocks';

export const routeMeta: RouteMeta = {
	title: 'TinyLineChart | Examples | ng-vz',
};

@Component({
	selector: 'docs-home',
	imports: [LineChart, Line, ResponsiveContainer],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="mx-auto max-w-3xl px-5 pt-20 pb-10">
			<hgroup class="flex flex-col items-start gap-2 pb-10">
				<h1 class="pb-5 text-4xl font-extrabold">TinyLineChart</h1>
				<a
					class="text-emerald-600 underline visited:text-emerald-900 hover:text-emerald-700"
					href="https://recharts.org/en-US/examples/TinyLineChart"
					target="_blank"
				>
					Recharts Docs &#x2197;
				</a>
				<a
					class="text-emerald-600 underline visited:text-emerald-900 hover:text-emerald-700"
					href="https://github.com/ajitzero/ng-vz/blob/main/apps/docs/src/app/pages/examples/TinyLineChart.page.ts"
				>
					View Source Code &#x2197;
				</a>
			</hgroup>

			<h2 class="pt-10 pb-2 text-2xl font-bold">Default, Curved Lines</h2>
			<div class="relative h-[350px] w-full">
				<vz-responsive-container class="outline">
					<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Default, Curved Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></svg:g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">Sharp Lines</h2>
			<div class="relative h-[350px] w-full">
				<vz-responsive-container class="outline">
					<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Sharp Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g [vzSettings]="{ skipSmoothing: true }" vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g
							[vzSettings]="{ skipSmoothing: true }"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="3"
						></svg:g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">Mixed Lines</h2>
			<div class="relative h-[350px] w-full">
				<vz-responsive-container class="outline">
					<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Mixed Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g [vzSettings]="{ skipSmoothing: false }" vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g
							[vzSettings]="{ skipSmoothing: true }"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="3"
						></svg:g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">With duplicates</h2>
			<p class="pb-10">
				Same data points can be used multiple times, usually for different types of line: curved/sharp, dashed/dotted or
				mixing with other types like bar charts.
			</p>
			<div class="relative h-[350px] w-full">
				<vz-responsive-container class="outline">
					<vz-line-chart [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Mixed Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g
							[vzSettings]="{ skipSmoothing: true }"
							vzLine
							dataKey="uv"
							stroke="darkblue"
							stroke-width="2"
						></svg:g>
						<svg:g [vzSettings]="{ skipSmoothing: true }" vzLine dataKey="pv" stroke="orange" stroke-width="3"></svg:g>
						<svg:g vzLine dataKey="jv" stroke="darkgreen" stroke-width="3" stroke-dasharray="5,5"></svg:g>
						<svg:g vzLine dataKey="kv" stroke="red" stroke-width="2" stroke-dasharray="2,4"></svg:g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>
		</div>
		<div class="px-5 pb-10">
			<h2 class="pt-10 pb-2 text-2xl font-bold">With Responsive Container</h2>
			<p class="pb-1">
				A responsive container uses position absolute, so it requires a parent element with a defined width and height.
			</p>
			<p class="pb-10">You can click on the dots to see the data point in this example.</p>
			<div class="relative h-[350px] w-full">
				<vz-responsive-container class="outline">
					<vz-line-chart [height]="450" [width]="600" [data]="longerData">
						<ng-container vzTitle>Tiny Line Chart within a Responsive Container</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g
							[activeDot]="8"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="2"
						></svg:g>
						<svg:g
							[activeDot]="8"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="uv"
							stroke="blue"
							stroke-width="3"
						></svg:g>
						<svg:g
							[vzSettings]="{ skipSmoothing: true }"
							[activeDot]="8"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="kv"
							stroke="red"
							stroke-width="2"
							stroke-dasharray="2,4"
						></svg:g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>
		</div>
	`,
})
export default class TinyComponent {
	basedata = MOCK_DATA;
	reversedData = [...MOCK_DATA].reverse();
	data = MOCK_DATA.map((item, index) => ({
		...item,
		jv: this.reversedData[index].uv,
		kv: this.reversedData[index].pv,
	}));
	longerData = [...this.data, ...this.data];

	handleClick(data: Record<string, Primitive>) {
		window.alert(JSON.stringify(data));
	}
}
