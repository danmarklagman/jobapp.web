import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubPage } from './hub.page';

export const routes: Routes = [
	{
		path: '',
		component: HubPage,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: () => import('../../pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
			},
			{
				path: 'professional-profiles',
				loadChildren: () => import('../../pages/professional-profile/professional-profile.module').then((m) => m.ProfessionalProfileModule)
			},
			{
				path: 'requests',
				loadChildren: () => import('../../pages/request/request.module').then((m) => m.RequestModule)
			},
			{
				path: 'my-profile',
				loadChildren: () => import('../../pages/my-profile/my-profile.module').then((m) => m.MyProfileModule)
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
export class HubRoutingModule { }
