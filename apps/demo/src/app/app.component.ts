import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Line, LineChart } from 'ng-vz';

@Component({
	selector: 'app-root',
	imports: [RouterModule, LineChart, Line],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<!-- <vz-line-chart class="m-1" [height]="500" [width]="500"> -->
		<vz-line-chart class="m-1">
			<ng-container vzTitle>Simple Line Chart 1</ng-container>
			<ng-container vzDesc>A sample chart for demonstrating the usage of the ng-vz library.</ng-container>

			<svg:g dataKey="uv" vzLine stroke="blue" stroke-width="2"></svg:g>
			<svg:g dataKey="pv" vzLine stroke="darkblue" stroke-width="5"></svg:g>
		</vz-line-chart>
		<router-outlet></router-outlet>
	`,
})
export class AppComponent {}
