import { DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	effect,
	ElementRef,
	inject,
	input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
import { CartesianChart } from '../charts';
import { CssNumberValue } from '../types/css';

@Component({
	selector: 'vz-responsive-container',
	template: `
		<ng-content></ng-content>
	`,
	host: {
		'[style]': 'hostStyle()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveContainer {
	private readonly element = inject(ElementRef);
	private readonly document = inject(DOCUMENT);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
	private readonly window = this.document?.defaultView!;

	private readonly chart = contentChild(CartesianChart);

	public readonly height = input<CssNumberValue>('auto');
	public readonly width = input<CssNumberValue>('auto');
	public readonly debounceTime = input(0);

	private readonly resizingEvent = toSignal(fromEvent(this.window, 'resize').pipe(debounceTime(this.debounceTime())));

	hostStyle = computed(() => {
		const height = this.height();
		const width = this.width();

		return {
			display: 'inline-block',
			position: 'absolute',
			boxSizing: 'content-box !important', // TODO: Remove this once we have a better way to handle this
			height,
			width,
		};
	});

	constructor() {
		effect(() => {
			const chart = this.chart();
			// These signals are needed to trigger the effect
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const linkedHeight = this.height();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const linkedWidth = this.width();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const _resizingEvent = this.resizingEvent();

			if (chart) {
				const element = this.element.nativeElement.parentElement;
				const style = this.window?.getComputedStyle(element);
				if (!style) return;

				chart.linkedHeight.set(element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom));
				chart.linkedWidth.set(element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
			}
		});
	}
}
