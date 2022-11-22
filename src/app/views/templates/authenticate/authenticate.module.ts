import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthenticatePage } from './authenticate.page';

@NgModule({
	declarations: [
		AuthenticatePage,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		AuthenticateRoutingModule,
	],
	providers: [

	]
})
export class AuthenticateModule { }
