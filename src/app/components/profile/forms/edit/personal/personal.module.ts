import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalProfileEditFormComponent } from './personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const importedComponents = [
    PersonalProfileEditFormComponent,
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
export class PersonalProfileEditFormModule { }
