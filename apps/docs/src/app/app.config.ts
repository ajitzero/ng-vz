import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, withComponentInputBinding, withPreloading, withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideFileRouter(withViewTransitions(), withComponentInputBinding(), withPreloading(PreloadAllModules)),
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
	],
};
