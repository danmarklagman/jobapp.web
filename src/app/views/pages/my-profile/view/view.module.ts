import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMyProfilePage } from './view.page';
import { ViewMyProfileRoutingModule } from './view-routing.module';

@NgModule({
	declarations: [
		ViewMyProfilePage,
	],
	imports: [
		CommonModule,
		ViewMyProfileRoutingModule,
	],
	exports: [
		ViewMyProfilePage,
	],
	providers: [],
})
export class ViewMyProfileModule { }
