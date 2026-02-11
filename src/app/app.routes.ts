import { Routes } from '@angular/router';
import { Home } from './Pages/Home/Home';
import { NotFound } from './Pages/NotFoundWebPage/NotFound';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '**', component: NotFound },
];
