import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPage } from '../../pages/login/login.page';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
	declarations: [
		RegisterPage,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		RegisterRoutingModule,
	],
	providers: [

	]
})
export class RegisterModule { }
