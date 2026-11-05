import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { Home } from './home/home';
import { Users } from './users/users';
import { Profile } from './profile/profile';

@NgModule({
  declarations: [Dashboard, Home, Users, Profile],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
