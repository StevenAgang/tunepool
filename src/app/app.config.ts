import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { API_URL } from './data/dataservice';
import { Interceptor } from './data/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([Interceptor])),
    provideToastr({ positionClass: 'toast-bottom-right', timeOut: 3000 }),
    provideAnimations(),
    { provide: API_URL, useValue: 'http://192.168.31.190:7278/playList/' },
  ],
};
