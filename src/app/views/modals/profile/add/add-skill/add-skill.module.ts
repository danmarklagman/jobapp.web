import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSkillModal } from 'src/app/views/modals/profile/add/add-skill/add-skill.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const importedComponents = [
    AddSkillModal,
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
export class AddSkillModule { }
