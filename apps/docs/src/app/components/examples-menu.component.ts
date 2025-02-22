import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'docs-examples-menu',
	imports: [RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<nav
			class="m-4 min-w-56 rounded border border-slate-200 bg-slate-50 p-4 md:m-0 md:w-64 md:rounded-none md:border-y-0 md:border-s-0 md:border-e"
		>
			<h2 class="px-2 pb-2 text-lg font-bold text-slate-950">Examples</h2>
			<ul class="list-none p-0">
				@for (link of links; track link.title) {
					<li>
						<a
							class="block rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
							[routerLink]="link.url"
						>
							{{ link.title }}
							@if (link.wip) {
								<span class="rounded bg-slate-500 px-1 py-0.5 text-xs text-slate-50" title="Work in Progress">WIP</span>
							}
						</a>
					</li>
				}
			</ul>
		</nav>
	`,
	host: {
		class: 'contents',
	},
})
export class ExamplesMenuComponent {
	protected readonly links = [
		{ title: 'SimpleLineChart', url: '/examples/SimpleLineChart', wip: true },
		{ title: 'TinyLineChart', url: '/examples/TinyLineChart' },
	];
}
