import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthTest } from './auth-test/auth-test';
import { authGuard } from './auth-guard'; // Navya's Route Guard[cite: 1]

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'auth-test', component: AuthTest, canActivate: [authGuard] },
  {
    path: 'dashboard',
    canActivate: [authGuard], // Protecting your Dashboard with Navya's Guard[cite: 1, 3]
    loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule) // Lazy Loading your module[cite: 3]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }