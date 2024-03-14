import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
};
