import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./views/templates/authenticate/authenticate.module').then((m) => m.AuthenticateModule)
	},
	{
		path: '',
		loadChildren: () => import('./views/templates/base/base.module').then((m) => m.BaseModule),
	},
	{
		path: 'hub',
		loadChildren: () => import('./views/templates/hub/hub.module').then((m) => m.HubModule),
		canActivate: [AuthenticatedGuard]
	},
];

@NgModule({
    imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
		}),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
