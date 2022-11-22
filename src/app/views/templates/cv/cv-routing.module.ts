import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvPage } from './cv.page';

export const routes: Routes = [
	{
		path: ':userId',
		component: CvPage,
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
export class CvRoutingModule { }
