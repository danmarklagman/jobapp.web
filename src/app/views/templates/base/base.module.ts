import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePage } from './base.page';
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
	declarations: [
		BasePage,
	],
	imports: [
		CommonModule,
		BaseRoutingModule,
	],
	exports: [
		BasePage,
	],
	providers: [],
})
export class BaseModule { }
