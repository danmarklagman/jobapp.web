import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEducationModal } from './add-education.modal';

const importedComponents = [
    AddEducationModal,
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
export class AddEducationModule { }
