import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Industry } from 'src/app/models/entities/industry.model';
import { Profile } from 'src/app/models/entities/profile.model';
import { ProfessionalProfileRequest } from 'src/app/models/requests/professional-profile.model';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
	selector: 'app-professional-profile-edit-form-component',
	templateUrl: './professional.component.html',
})

export class ProfessionalProfileEditFormComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

	@Input()
	public profile: Profile = new Profile();
	@Input()
	public industries: Industry[] = [];

	@Output()
    public profileSaved: EventEmitter<boolean> = new EventEmitter();

	public isSaving: boolean = false;
	public professionalProfileForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private profileService: ProfileService,
		private formBuilder: FormBuilder,
        private formValidatorService: FormValidatorService,
	) {
		this.professionalProfileForm = this.formBuilder.group({
            title: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            website: [{
                value: '',
                disabled: this.isSaving,
            }],
			industry: [{
                value: '',
                disabled: this.isSaving,
            }],
			salaryRate: [{
                value: '',
                disabled: this.isSaving,
            }],
			employmentStatus: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
			availability: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
        });
	}

	get title() {

        return this.professionalProfileForm.get('title');
    }

    get website() {

        return this.professionalProfileForm.get('website');
    }

    get industry() {

        return this.professionalProfileForm.get('industry');
    }

    get salaryRate() {

        return this.professionalProfileForm.get('salaryRate');
    }

    get employmentStatus() {

        return this.professionalProfileForm.get('employmentStatus');
    }

    get availability() {

        return this.professionalProfileForm.get('availability');
    }

	ngOnInit(): void {

	}

	ngAfterViewInit(): void {

	}

	ngOnChanges(changes: SimpleChanges): void {
		
		this.setDefaultModelValues(this.profile);
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

	public didSave(event: Event) {

        event.preventDefault();

        this.isSaving = true;

        if (this.professionalProfileForm.invalid) {
			this.formValidatorService.validateAllFields(this.professionalProfileForm);
			this.isSaving = false;
			return;
		}

        const professionalProfilePayload: ProfessionalProfileRequest = {
            title: this.title?.value,
            website: this.website?.value,
            industry_id: this.industry?.value,
            salary_rate: this.salaryRate?.value,
            employment_status: this.employmentStatus?.value,
            availability: this.availability?.value,
        };

        const login$ = this.profileService.updateProfessional(professionalProfilePayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
                    if (response && response.result) {
                        this.profileSaved.emit(true);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(login$);
    }

	private setDefaultModelValues(profile: Profile) {

        this.title?.setValue(profile.title);
        this.website?.setValue(profile.website);
		this.industry?.setValue(profile.industry?.id);
        this.salaryRate?.setValue(profile.salary_rate);
        this.employmentStatus?.setValue(profile.employment_status);
        this.availability?.setValue(profile.availability);
    }
}
