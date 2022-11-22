import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfilePage } from './my-profile.page';

export const routes: Routes = [
	{
		path: '',
		component: MyProfilePage,
		children: [
			{
				path: '',
				redirectTo: 'view',
				pathMatch: 'full',
			},
			{
				path: 'view',
				loadChildren: () => import('./view/view.module').then((m) => m.ViewMyProfileModule)
			},
			{
				path: 'edit',
				loadChildren: () => import('./edit/edit.module').then((m) => m.EditMyProfileModule)
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
export class MyProfileRoutingModule { }
