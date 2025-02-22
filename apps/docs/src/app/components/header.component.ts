import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'docs-header',
	imports: [JsonPipe, AsyncPipe],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a
			class="rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
			href="/"
		>
			<- Back
		</a>
		@if (activePage) {
			<h1 class="flex items-center">
				<a
					class="z-10 rounded-lg px-2 py-1 text-slate-950 hover:bg-slate-100 hover:text-slate-800 hover:outline hover:outline-slate-300"
					[href]="urlPrefix() + '/' + page.url"
				>
					{{ page.title }}
				</a>
			</h1>
		}
		<div class="flex items-center">
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
		</div>
	`,
	host: {
		class: 'flex justify-between border-b border-slate-300 bg-slate-200 px-2 py-2',
	},
})
export class HeaderComponent {
	private readonly route = inject(ActivatedRoute);
	private readonly children = this.route.routeConfig?.children ?? [];
	protected readonly activePage = this.children.find(item =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(item as any)?._loadedRoutes?.some((route: { title: string | undefined }) => Boolean(route?.title)),
	);

	public readonly urlPrefix = input.required<string>();

	/**
	 * There has to be a better way to do this.
	 */
	protected readonly page = {
		title:
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(this.activePage as any)._loadedRoutes.find((route: { title: string | undefined }) => Boolean(route?.title))
				?.title ?? '',
		url: this.activePage?.path ?? '',
	};
}
