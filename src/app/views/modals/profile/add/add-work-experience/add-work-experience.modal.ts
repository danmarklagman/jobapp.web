
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Experience } from 'src/app/models/entities/experience.model';
import { ExperienceRequest } from 'src/app/models/requests/experience.model';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';

@Component({
	selector: 'app-add-work-experience-modal',
	templateUrl: './add-work-experience.modal.html',
})

export class AddWorkExperienceModal implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('closeExperienceButton') 
	public closeExperienceButton: ElementRef;

	@Output() 
	public saved: EventEmitter<Experience> = new EventEmitter();

	public isSaving: boolean = false;
    public experienceForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private experienceService: ExperienceService,
		private formBuilder: FormBuilder,
		private formValidatorService: FormValidatorService,
	) {
		this.experienceForm = this.formBuilder.group({
            companyName: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            address: [{
                value: '',
                disabled: this.isSaving,
            }],
			title: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
			workDescription: [{
                value: '',
                disabled: this.isSaving,
            }],
			startDate: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
			endDate: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
        });
	}

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		
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

	get companyName() {

		return this.experienceForm.get('companyName');
	}

	get address() {

		return this.experienceForm.get('address');
	}

	get title() {

		return this.experienceForm.get('title');
	}

	get workDescription() {

		return this.experienceForm.get('workDescription');
	}

	get startDate() {

		return this.experienceForm.get('startDate');
	}

	get endDate() {

		return this.experienceForm.get('endDate');
	}
	
	public didSave(event: Event) {

		event.preventDefault();

        this.isSaving = true;

        if (this.experienceForm.invalid) {
			this.formValidatorService.validateAllFields(this.experienceForm);
			this.isSaving = false;
			return;
		}

        const experiencePayload: ExperienceRequest = {
            company_name: this.companyName?.value,
            address: this.address?.value,
            title: this.title?.value,
            work_description: this.workDescription?.value,
            start_date: this.startDate?.value,
            end_date: this.endDate?.value,
        };

        const createExperience$ = this.experienceService.create(experiencePayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
					const experience: Experience = response.result;
                    if (experience) {
                        this.saved.emit(experience);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(createExperience$);

		this.closeExperienceButton.nativeElement.click();
	}
}
