import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { enableProdMode } from '@angular/core';
import { Environment } from './environment/environment';

if (Environment.production) enableProdMode();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
