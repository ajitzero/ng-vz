import { RouteMeta } from '@analogjs/router';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
	HlmBreadcrumbDirective,
	HlmBreadcrumbItemDirective,
	HlmBreadcrumbLinkDirective,
	HlmBreadcrumbListDirective,
	HlmBreadcrumbPageDirective,
	HlmBreadcrumbSeparatorComponent,
} from '@spartan-ng/ui-breadcrumb-helm';
import { CartesianChart, DataPointClickEvent, Line, ResponsiveContainer } from 'ng-vz';
import { ExamplesHeroComponent } from '../../components/examples-hero.component';
import { MockDataService } from './mock-data.service';

const meta = {
	title: 'TinyLineChart',
	description: 'A tiny line chart example using ng-vz.',
	displayName: 'Tiny Line Chart',
};

export const routeMeta: RouteMeta = {
	title: meta.title,
};

@Component({
	imports: [
		CartesianChart,
		Line,
		ResponsiveContainer,
		RouterLink,

		HlmBreadcrumbDirective,
		HlmBreadcrumbSeparatorComponent,
		HlmBreadcrumbListDirective,
		HlmBreadcrumbItemDirective,
		HlmBreadcrumbPageDirective,
		HlmBreadcrumbLinkDirective,
		ExamplesHeroComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="mx-auto max-w-3xl px-5 pt-20 pb-10">
			<nav class="mb-5" hlmBreadcrumb>
				<ol hlmBreadcrumbList>
					<li hlmBreadcrumbItem>
						<a hlmBreadcrumbLink link="/">Home</a>
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<a hlmBreadcrumbLink hlmL link="/examples">Examples</a>
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<span hlmBreadcrumbPage>{{ meta.title }}</span>
					</li>
				</ol>
			</nav>

			<docs-examples-hero [name]="meta.displayName" [link]="meta.title" />

			<h2 class="pt-10 pb-2 text-2xl font-bold">Curved Lines</h2>
			<div class="relative h-[200px] w-full lg:h-[350px]">
				<vz-responsive-container class="outline">
					<vz-cartesian-chart
						class="outline"
						[vzSettings]="{ enableSmoothing: true }"
						[height]="300"
						[width]="600"
						[data]="data"
					>
						<ng-container vzTitle>Tiny Line Chart (Curved Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></svg:g>
					</vz-cartesian-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">Default, Sharp Lines</h2>
			<div class="relative h-[200px] w-full lg:h-[350px]">
				<vz-responsive-container class="outline">
					<vz-cartesian-chart class="outline" [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Default, Sharp Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></svg:g>
					</vz-cartesian-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">Mixed Lines</h2>
			<div class="relative h-[200px] w-full lg:h-[350px]">
				<vz-responsive-container class="outline">
					<vz-cartesian-chart class="outline" [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (Mixed Lines)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g
							[vzSettings]="{ enableSmoothing: true }"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="3"
						></svg:g>
					</vz-cartesian-chart>
				</vz-responsive-container>
			</div>

			<h2 class="pt-10 pb-2 text-2xl font-bold">With duplicates & variations: dotted, dashed</h2>
			<p class="pb-10">
				Same data points can be used multiple times, usually for different types of line: curved/sharp, dashed/dotted or
				mixing with other types like bar charts.
			</p>
			<div class="relative h-[200px] w-full lg:h-[350px]">
				<vz-responsive-container class="outline">
					<vz-cartesian-chart [height]="300" [width]="600" [data]="data">
						<ng-container vzTitle>Tiny Line Chart (With duplicates)</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g [vzSettings]="{ enableSmoothing: true }" vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
						<svg:g vzLine dataKey="uv" stroke="darkblue" stroke-width="2"></svg:g>
						<svg:g vzLine dataKey="pv" stroke="orange" stroke-width="3"></svg:g>
						<svg:g
							[vzSettings]="{ enableSmoothing: true }"
							vzLine
							dataKey="jv"
							stroke="darkgreen"
							stroke-width="3"
							stroke-dasharray="5 5"
						></svg:g>
						<svg:g
							[vzSettings]="{ enableSmoothing: true }"
							vzLine
							dataKey="kv"
							stroke="red"
							stroke-width="2"
							stroke-dasharray="2 4"
						></svg:g>
					</vz-cartesian-chart>
				</vz-responsive-container>
			</div>
		</div>
		<div class="px-5 pb-10">
			<div class="max-w-3xl">
				<h2 class="pt-10 pb-2 text-2xl font-bold">With Responsive Container</h2>
				<p class="pb-1">
					A responsive container uses position absolute, so it requires a parent element positioned as
					<code>relative</code>
					with a defined height and width.
				</p>
				<p class="pb-10">You can click on the dots to see the data point in this example.</p>
			</div>
			<div class="relative h-[200px] w-full lg:h-[350px]">
				<vz-responsive-container class="outline">
					<vz-cartesian-chart [height]="450" [width]="600" [data]="longerData">
						<ng-container vzTitle>Tiny Line Chart within a Responsive Container</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<svg:g
							[activeDot]="5"
							[vzSettings]="{ enableSmoothing: true }"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="2"
						></svg:g>
						<svg:g
							[activeDot]="5"
							[vzSettings]="{ enableSmoothing: true }"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="uv"
							stroke="blue"
							stroke-width="3"
						></svg:g>
						<svg:g
							[activeDot]="5"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="kv"
							stroke="red"
							stroke-width="2"
							stroke-dasharray="2 4"
						></svg:g>
					</vz-cartesian-chart>
				</vz-responsive-container>
			</div>
		</div>
	`,
})
export default class TinyLineChartComponent {
	private readonly mockDataService = inject(MockDataService);
	private readonly document = inject(DOCUMENT);
	private readonly window = this.document.defaultView;

	protected readonly data = this.mockDataService.data;
	protected readonly longerData = this.mockDataService.longerData;

	protected readonly meta = meta;

	protected handleClick(data: DataPointClickEvent) {
		if (this.window) {
			this.window.alert(JSON.stringify(data));
		}
	}
}
