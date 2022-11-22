import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalProfilePage } from './professional-profile.page';
import { ProfessionalProfileRoutingModule } from './professional-profile-routing.module';

@NgModule({
	declarations: [
		ProfessionalProfilePage
	],
	imports: [
		CommonModule,
		ProfessionalProfileRoutingModule,
	],
	exports: [
		ProfessionalProfilePage,
	],
	providers: [],
})
export class ProfessionalProfileModule { }
