import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPage } from '../../pages/login/login.page';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	declarations: [
		LoginPage,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		LoginRoutingModule,
	],
	providers: [

	]
})
export class LoginModule { }
