import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Line, LineChart, ResponsiveContainer } from 'ng-vz';
import { MOCK_DATA } from './mocks';

@Component({
	selector: 'app-root',
	imports: [RouterModule, LineChart, Line, ResponsiveContainer],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="p-1">
			<h1>TinyLineChart</h1>
			<vz-line-chart class="outline" [height]="250" [width]="600" [data]="data">
				<ng-container vzTitle>Simple Line Chart 1</ng-container>
				<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

				<g vzLine dataKey="uv" stroke="blue" stroke-width="2"></g>
				<g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></g>
			</vz-line-chart>

			<h1>Responsive Container: TinyLineChart</h1>
			<div style="position: relative; width: 100%; height: 250px">
				<vz-responsive-container class="outline">
					<vz-line-chart [height]="250" [width]="600" [data]="data">
						<ng-container vzTitle>Simple Line Chart 2</ng-container>
						<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

						<g vzLine dataKey="pv" stroke="darkblue" stroke-width="2"></g>
						<g vzLine dataKey="uv" stroke="blue" stroke-width="3"></g>
					</vz-line-chart>
				</vz-responsive-container>
			</div>
			<a href="https://recharts.org/en-US/examples/TinyLineChart">TinyLineChart | Recharts</a>
		</div>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	data = MOCK_DATA;
}
