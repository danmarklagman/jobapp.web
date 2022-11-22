import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessionalProfileEditFormComponent } from './professional.component';

const importedComponents = [
    ProfessionalProfileEditFormComponent,
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
export class ProfessionalProfileEditFormModule { }
