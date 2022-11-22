import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfilePage } from './my-profile.page';
import { MyProfileRoutingModule } from './my-profile-routing.module';

@NgModule({
	declarations: [
		MyProfilePage,
	],
	imports: [
		CommonModule,
		MyProfileRoutingModule,
	],
	exports: [
		MyProfilePage,
	],
	providers: [],
})
export class MyProfileModule { }
