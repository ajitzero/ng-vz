import { RouteMeta } from '@analogjs/router';

// export const routeMeta: RouteMeta = {
// 	redirectTo: '/examples/TinyLineChart',
// 	pathMatch: 'full',
// };

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
	title: 'Examples',
	description: 'Examples of using ng-vz.',
	displayName: 'Examples',
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
						<span hlmBreadcrumbPage>{{ meta.title }}</span>
					</li>
				</ol>
			</nav>

			<docs-examples-hero [name]="meta.displayName" />

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				@for (chart of charts; track chart.name) {
					<div class="card">
						<h2 class="pt-10 pb-2 text-2xl font-bold">
							<a routerLink="{{ chart.url }}">{{ chart.name }}</a>
						</h2>
						<div class="relative h-[200px] w-full lg:h-[250px]">
							<vz-responsive-container class="outline">
								<vz-cartesian-chart
									class="outline"
									[vzSettings]="{ enableSmoothing: true }"
									[height]="250"
									[width]="250"
									[data]="data"
								>
									<ng-container vzTitle>Tiny Line Chart (Curved Lines)</ng-container>
									<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

									<svg:g vzLine dataKey="uv" stroke="blue" stroke-width="2"></svg:g>
									<svg:g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></svg:g>
								</vz-cartesian-chart>
							</vz-responsive-container>
						</div>
					</div>
				}
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

	protected readonly charts = [
		{
			name: 'Simple Line Chart',
			url: '/examples/SimpleLineChart',
		},
		{
			name: 'Tiny Line Chart',
			url: '/examples/TinyLineChart',
		},
	];

	protected handleClick(data: DataPointClickEvent) {
		if (this.window) {
			this.window.alert(JSON.stringify(data));
		}
	}
}
