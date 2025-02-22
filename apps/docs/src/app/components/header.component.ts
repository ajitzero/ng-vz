import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'docs-header',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a
			class="rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
			href="/"
		>
			<- Back
		</a>
		<h2 class="flex items-center">
			<a
				class="z-10 rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
				href="https://github.com/ajitzero"
			>
				ajitzero
			</a>
			<div class="-mx-1.5">/</div>
			<a
				class="z-10 rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
				href="https://github.com/ajitzero/ng-vz"
			>
				ng-vz
			</a>
		</h2>
	`,
	host: {
		class: 'flex justify-between border-b border-slate-300 bg-slate-200 px-2 py-2',
	},
})
export class HeaderComponent {}
