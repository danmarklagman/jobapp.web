import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestPage } from './request.page';

export const routes: Routes = [
	{
		path: '',
		component: RequestPage,
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
export class RequestRoutingModule { }
