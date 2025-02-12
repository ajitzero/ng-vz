import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Primitive } from 'd3-array';
import { Line, LineChart, ResponsiveContainer } from 'ng-vz';
import { MOCK_DATA } from './mocks';

@Component({
	selector: 'app-root',
	imports: [RouterModule, LineChart, Line, ResponsiveContainer],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="p-1">
			<h1>TinyLineChart</h1>
			<a href="https://recharts.org/en-US/examples/TinyLineChart">TinyLineChart | Recharts</a>

			<h2>Default</h2>
			<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
				<ng-container vzTitle>Simple Line Chart 1</ng-container>
				<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

				<g vzLine dataKey="uv" stroke="blue" stroke-width="2"></g>
				<g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></g>
			</vz-line-chart>

			<hr class="m-1" />

			<h2>Sharp</h2>

			<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
				<ng-container vzTitle>Simple Line Chart 1</ng-container>
				<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

				<g [vzSettings]="{ skipSmoothing: true }" vzLine dataKey="uv" stroke="blue" stroke-width="2"></g>
				<g [vzSettings]="{ skipSmoothing: true }" vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></g>
			</vz-line-chart>

			<hr class="m-1" />

			<h2>Mixed</h2>

			<vz-line-chart class="outline" [height]="300" [width]="600" [data]="data">
				<ng-container vzTitle>Simple Line Chart 1</ng-container>
				<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

				<g [vzSettings]="{ skipSmoothing: false }" vzLine dataKey="uv" stroke="blue" stroke-width="2"></g>
				<g [vzSettings]="{ skipSmoothing: true }" vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></g>
			</vz-line-chart>

			<hr class="m-1" />

			<h2>With Responsive Container</h2>
			<div style="position: relative; width: 100%; height: 350px">
				<vz-responsive-container class="outline">
					<vz-line-chart [height]="450" [width]="600" [data]="data">
						<ng-container vzTitle>Simple Line Chart 2</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<g
							[activeDot]="8"
							(clicked)="handleClick($event)"
							vzLine
							dataKey="pv"
							stroke="darkblue"
							stroke-width="2"
						></g>
						<g [activeDot]="8" (clicked)="handleClick($event)" vzLine dataKey="uv" stroke="blue" stroke-width="3"></g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>
		</div>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	data = MOCK_DATA;

	handleClick(data: Record<string, Primitive>) {
		window.alert(JSON.stringify(data));
	}
}
