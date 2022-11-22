import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSkillModal } from 'src/app/views/modals/profile/add/add-skill/add-skill.modal';
import { DatatableComponent } from './datatable.component';

const importedComponents = [
    DatatableComponent,
];

@NgModule({
	declarations: [
		...importedComponents,
	],
	imports: [
		CommonModule,
	],
	exports: [
		...importedComponents,
	],
	providers: [],
})
export class DatatableModule { }
