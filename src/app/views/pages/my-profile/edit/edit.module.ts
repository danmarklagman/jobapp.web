import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMyProfilePage } from './edit.page';
import { EditMyProfileRoutingModule } from './edit-routing.module';
import { AddWorkExperienceModal } from 'src/app/views/modals/profile/add/add-work-experience/add-work-experience.modal';
import { AddSkillModule } from 'src/app/views/modals/profile/add/add-skill/add-skill.module';
import { DatatableModule } from 'src/app/components/datatable/datatable.module';
import { AddWorkExperienceModule } from 'src/app/views/modals/profile/add/add-work-experience/add-work-experience.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEducationModule } from 'src/app/views/modals/profile/add/add-education/add-education.module';
import { AddReferenceModule } from 'src/app/views/modals/profile/add/add-reference/add-reference.module';
import { PersonalProfileEditFormModule } from 'src/app/components/profile/forms/edit/personal/personal.module';
import { ProfessionalProfileEditFormModule } from 'src/app/components/profile/forms/edit/professional/professional.module';

const importedComponents = [
    EditMyProfilePage,
];

@NgModule({
	declarations: [
		...importedComponents,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		EditMyProfileRoutingModule,
		AddSkillModule,
		AddWorkExperienceModule,
		AddEducationModule,
		AddReferenceModule,
		PersonalProfileEditFormModule,
		ProfessionalProfileEditFormModule,
		DatatableModule,
	],
	exports: [
		...importedComponents,
	],
	providers: [],
})
export class EditMyProfileModule { }
