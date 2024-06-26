import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMyProfilePage } from './view.page';

export const routes: Routes = [
	{
		path: '',
		component: ViewMyProfilePage,
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
export class ViewMyProfileRoutingModule { }
