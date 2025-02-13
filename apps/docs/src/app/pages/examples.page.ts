import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<div class="flex justify-between bg-amber-100 p-5">
			<a class="text-amber-700 underline hover:text-amber-600" href="/"><- Back Home</a>
			<h2>Examples</h2>
			<a
				class="text-amber-700 underline hover:text-amber-600"
				href="https://github.com/ajitzero/ng-vz/blob/main/apps/docs/src/app/pages/examples"
			>
				GitHub
			</a>
		</div>
		<main>
			<router-outlet></router-outlet>
		</main>
	`,
})
export default class ExamplesComponent {}
