import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMyProfilePage } from './view.page';
import { ViewMyProfileRoutingModule } from './view-routing.module';
import { SendMailModule } from 'src/app/views/modals/sendmail/sendmail.module';

@NgModule({
	declarations: [
		ViewMyProfilePage,
	],
	imports: [
		CommonModule,
		ViewMyProfileRoutingModule,
		SendMailModule,
	],
	exports: [
		ViewMyProfilePage,
	],
	providers: [],
})
export class ViewMyProfileModule { }
