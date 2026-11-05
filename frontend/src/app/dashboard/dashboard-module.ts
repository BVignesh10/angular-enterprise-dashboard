import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard';
import { DashboardRoutingModule } from './dashboard-routing-module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent // Standalone component kabatti imports lo vuntundhi
  ]
})
export class DashboardModule { }