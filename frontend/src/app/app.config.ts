import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app.interceptor';
import { API_PREFIX } from './services/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: API_PREFIX, useValue: environment.apiPrefix },
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
