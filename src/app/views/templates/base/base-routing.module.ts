import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasePage } from './base.page';

export const routes: Routes = [
	{
		path: '',
		component: BasePage,
		children: [
			{
				path: '',
				loadChildren: () => import('../../pages/home/home.module').then((m) => m.HomeModule)
			},
		],
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
export class BaseRoutingModule { }
