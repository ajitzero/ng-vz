import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExamplesMenuComponent } from '../components/examples-menu.component';
import { HeaderComponent } from '../components/header.component';

@Component({
	standalone: true,
	imports: [RouterOutlet, ExamplesMenuComponent, HeaderComponent],
	template: `
		<docs-header urlPrefix="/examples" />
		<div class="md:flex">
			<docs-examples-menu />
			<main class="grow-1">
				<router-outlet></router-outlet>
			</main>
		</div>
	`,
})
export default class ExamplesComponent {}
