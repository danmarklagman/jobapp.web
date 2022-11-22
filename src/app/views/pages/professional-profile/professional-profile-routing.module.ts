import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessionalProfilePage } from './professional-profile.page';

export const routes: Routes = [
	{
		path: '',
		component: ProfessionalProfilePage,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProfessionalProfileRoutingModule { }
