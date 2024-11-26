import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarsComponent } from './cars/cars.component';
import { JobsComponent } from './jobs/jobs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'jobs', component: JobsComponent },
];
