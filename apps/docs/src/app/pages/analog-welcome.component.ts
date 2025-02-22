import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'docs-analog-welcome',
	imports: [RouterLink],
	template: `
		<main class="mx-auto flex-1">
			<section class="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
				<div class="flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h1 class="font-heading text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
						<span class="text-emerald-600">ng-vz.</span>
						Composable Angular directives for visualisations.
					</h1>
					<p class="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
						Porting from Recharts (now) & airbnb/visx (eventually?)
						<br />
						Powered by ✨Spite✨
						<!-- <br /> -->
						<!-- Examples inspired from Tremor. -->
					</p>
					<div class="space-x-4">
						<a
							class="focus-visible:ring-ring ring-offset-background inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-8 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-950/90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
							routerLink="/examples"
						>
							Examples
						</a>
						<a
							class="focus-visible:ring-ring ring-offset-background border-input inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
							target="_blank"
							rel="noreferrer"
							href="https://github.com/ajitzero/ng-vz"
						>
							Star on GitHub
						</a>
					</div>
				</div>
			</section>
		</main>
	`,
	host: {
		class: 'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
	},
})
export class AnalogWelcomeComponent {}
