import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPage } from './request.page';
import { RequestRoutingModule } from './request-routing.module';

@NgModule({
	declarations: [
		RequestPage
	],
	imports: [
		CommonModule,
		RequestRoutingModule,
	],
	exports: [
		RequestPage,
	],
	providers: [],
})
export class RequestModule { }
