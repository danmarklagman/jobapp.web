import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendMailModal } from './sendmail.modal';

const importedComponents = [
    SendMailModal,
];

@NgModule({
	declarations: [
		...importedComponents,
	],
	imports: [
		CommonModule,
        ReactiveFormsModule,
		FormsModule,
	],
	exports: [
		...importedComponents,
	],
	providers: [],
})
export class SendMailModule { }
