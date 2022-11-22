import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReferenceModal } from './add-reference.modal';

const importedComponents = [
    AddReferenceModal,
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
export class AddReferenceModule { }
