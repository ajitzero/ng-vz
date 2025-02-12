import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Line, LineChart } from 'ng-vz';
import { MOCK_DATA } from './mocks';

@Component({
	selector: 'app-root',
	imports: [RouterModule, LineChart, Line],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<vz-line-chart class="m-1" [height]="250" [width]="600" [data]="data">
			<ng-container vzTitle>Simple Line Chart 1</ng-container>
			<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

			<g vzLine dataKey="uv" stroke="blue" stroke-width="2"></g>
			<g vzLine dataKey="pv" stroke="darkblue" stroke-width="3"></g>
		</vz-line-chart>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {
	data = MOCK_DATA;
}
