import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
	selector: 'docs-header',
	imports: [RouterLink],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a
			class="rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
			routerLink="/"
		>
			<- Back
		</a>
		<h1 class="flex items-center">
			<a
				class="z-10 rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
				[routerLink]="url()"
			>
				{{ title() }}
			</a>
		</h1>
		<a
			class="z-10 rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
			href="https://github.com/ajitzero/ng-vz"
		>
			ajitzero/ng-vz
		</a>
	`,
	host: {
		class: 'flex justify-between border-b border-slate-300 bg-slate-200 px-2 py-2',
	},
})
export class HeaderComponent {
	private readonly router = inject(Router);
	protected readonly url = toSignal(
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			startWith(null),
			map(() => this.router.url),
		),
		{ initialValue: '' },
	);
	protected readonly title = computed(() => this.url().split('/').at(-1));
}
