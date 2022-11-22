import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMyProfilePage } from './edit.page';

export const routes: Routes = [
	{
		path: '',
		component: EditMyProfilePage,
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
export class EditMyProfileRoutingModule { }
