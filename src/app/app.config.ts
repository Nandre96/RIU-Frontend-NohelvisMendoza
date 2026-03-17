import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { fakeBackendInterceptor } from './core/interceptors/fake-backend-interceptor';
import { matPaginatorEsFactory } from './shared/i18n/mat-paginator-es';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([fakeBackendInterceptor])),
    { provide: MatPaginatorIntl, useFactory: matPaginatorEsFactory },
  ],
};
