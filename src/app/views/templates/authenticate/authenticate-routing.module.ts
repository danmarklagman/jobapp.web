import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterPage } from '../../pages/register/register.page';
import { AuthenticatePage } from './authenticate.page';

export const routes: Routes = [
	{
		path: '',
		component: AuthenticatePage,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				loadChildren: () => import('../../pages/login/login.module').then((m) => m.LoginModule),
			},
			{
				path: 'register',
				loadChildren: () => import('../../pages/register/register.module').then((m) => m.RegisterModule),
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class AuthenticateRoutingModule { }
