import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, SubscriptionLike } from 'rxjs';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';
import { TableHeaderInterface } from 'src/app/interfaces/table-header.interface';
import { Education } from 'src/app/models/entities/education.model';
import { Experience } from 'src/app/models/entities/experience.model';
import { Industry } from 'src/app/models/entities/industry.model';
import { Profile } from 'src/app/models/entities/profile.model';
import { Reference } from 'src/app/models/entities/reference.model';
import { Skill } from 'src/app/models/entities/skill.model';
import { PersonalProfileRequest } from 'src/app/models/requests/personal-profile.model';
import { ProfessionalProfileRequest } from 'src/app/models/requests/professional-profile.model';
import { Response } from 'src/app/models/responses/response.model';
import { EducationService } from 'src/app/services/education/education.service';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { IndustryService } from 'src/app/services/industry/industry.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
	selector: 'app-edit-my-profile',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})

export class EditMyProfilePage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('skillDataTable')
    public skillDataTable: DatatableComponent;

    @ViewChild('experienceDataTable')
    public experienceDataTable: DatatableComponent;

    @ViewChild('educationDataTable')
    public educationDataTable: DatatableComponent;

    @ViewChild('referenceDataTable')
    public referenceDataTable: DatatableComponent;

    
    
    public profile: Profile = new Profile();
    public skills: Skill[] = [];
    public experiences: Experience[] = [];
    public educations: Education[] = [];
    public references: Reference[] = [];
    public industries: Industry[] = [];

    private subscriptions: SubscriptionLike[] = [];

	constructor(
        private router: Router,
        private profileService: ProfileService,
        private industryService: IndustryService,
        private skillService: SkillService,
        private educationService: EducationService,
        private experienceService: ExperienceService,
        private referenceService: ReferenceService,
    ) {
 
	}

	ngOnInit(): void {
		
	}

    ngAfterViewInit(): void {
        
        this.getMyProfile();
        this.getAllIndustries();
        this.getMySkills();
        this.getMyEducations();
        this.getMyExperiences();
        this.getMyReferences();
    }

    ngOnDestroy(): void {
        
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach((subscription: SubscriptionLike) => {
                if (typeof subscription !== undefined) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    public onPersonalProfileSaved(saved: boolean) {

        if (saved) {
            console.log(saved);
        }
    }

    public onProfessionalProfileSaved(saved: boolean) {

        if (saved) {
            console.log(saved);
        }
    }

    public onSkillSave(skill: Skill) {

        this.skills.push(skill);
    }

    public onExperienceSave(experience: Experience) {

        this.experiences.push(experience);
    }

    public onEducationSave(education: Education) {

        this.educations.push(education);
    }

    public onReferenceSave(reference: Reference) {

        this.references.push(reference);
    }

    public didGoBack() {

        this.router.navigate(['/hub/my-profile/view']);
    }

    private getMyProfile() {

        const getProfile$ = this.profileService.getMyProfile()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const profileResponse: Profile = response.result;
                    this.profile = profileResponse;
                },
                error: (err) => console.log(err)
            });
        this.subscriptions.push(getProfile$);
    }

    private getAllIndustries() {

        const getAllIndustries$ = this.industryService.getAll()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const industriesReponse: Industry[] = response.result;
                    this.industries = industriesReponse;
                },
                error: (err) => console.log(err)
            });
        this.subscriptions.push(getAllIndustries$);
    }

    private getMySkills() {

        const getMySkills$ = this.skillService.getMySkills()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const skills: Skill[] = response.result;
                    this.skills = skills;
                    this.initAndPopulateSkillsData();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        this.subscriptions.push(getMySkills$);
    }

    private getMyEducations() {

        const getMyEducations$ = this.educationService.getMyEducations()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const educations: Education[] = response.result;
                    this.educations = educations;
                    this.initAndPopulateEducationData();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        this.subscriptions.push(getMyEducations$);
    }

    private getMyExperiences() {

        const getMyExperiences$ = this.experienceService.getMyExperiences()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const experiences: Experience[] = response.result;
                    this.experiences = experiences;
                    this.initAndPopulateExperienceData();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        this.subscriptions.push(getMyExperiences$);
    }

    private getMyReferences() {

        const getMyReferences$ = this.referenceService.getMyReferences()
            .pipe()
            .subscribe({
                next: (response: Response | any) => {
                    const references: Reference[] = response.result;
                    this.references = references;
                    this.initAndPopulateReferenceData();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        this.subscriptions.push(getMyReferences$);
    }

    private initAndPopulateSkillsData() {
        
        const skillHeaders = [
            'name',
            'rating',
        ].map((x, i) => ({ key: x, index: i, isSelected: true } as TableHeaderInterface));

        this.skillDataTable.render(skillHeaders, this.skills);
    }

    private initAndPopulateExperienceData() {

        const experienceHeaders = [
            'company_name',
            'title',
            'start_date',
            'end_date',
        ].map((x, i) => ({ key: x, index: i, isSelected: true } as TableHeaderInterface));

        this.experienceDataTable.render(experienceHeaders, this.experiences);
    }

    private initAndPopulateEducationData() {

        const educationHeaders = [
            'school_name',
            'degree',
            'course',
            'graduate_date',
        ].map((x, i) => ({ key: x, index: i, isSelected: true } as TableHeaderInterface));

        this.educationDataTable.render(educationHeaders, this.educations);
    }

    private initAndPopulateReferenceData() {

        const referenceHeaders = [
            'name',
            'contact_number',
        ].map((x, i) => ({ key: x, index: i, isSelected: true } as TableHeaderInterface));

        this.referenceDataTable.render(referenceHeaders, this.references);
    }
}
