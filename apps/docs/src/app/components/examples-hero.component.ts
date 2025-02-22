import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'docs-examples-hero',
	imports: [RouterLink],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hgroup class="flex flex-col items-start gap-2 pb-10">
			<h2 class="pb-5 text-4xl font-extrabold">{{ name() }}</h2>

			@for (link of links(); track link.title) {
				@if (link.external) {
					<a
						class="text-cyan-600 underline visited:text-cyan-900 hover:text-cyan-700"
						[href]="link.url"
						target="_blank"
					>
						{{ link.title }}
						&#x2197;
					</a>
				} @else {
					<a class="text-cyan-600 underline visited:text-cyan-900 hover:text-cyan-700" [routerLink]="link.url">
						{{ link.title }}
					</a>
				}
			}
		</hgroup>
	`,
	host: {
		class: 'contents',
	},
})
export class ExamplesHeroComponent {
	public readonly name = input.required<string>();
	public readonly link = input.required<string>();

	protected readonly links = computed(() => {
		const link = this.link();
		return [
			{ title: 'Recharts Docs', url: `https://recharts.org/en-US/examples/${link}`, external: true },
			{
				title: 'View Source Code',
				url: `https://github.com/ajitzero/ng-vz/blob/main/apps/docs/src/app/pages/examples/${link}.page.ts`,
				external: true,
			},
		];
	});
}
