import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
	declarations: [
		DashboardPage,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
	],
	exports: [
		DashboardPage,
	],
	providers: [],
})
export class DashboardModule { }
