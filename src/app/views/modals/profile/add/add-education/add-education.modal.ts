
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Education } from 'src/app/models/entities/education.model';
import { EducationRequest } from 'src/app/models/requests/education.model';
import { EducationService } from 'src/app/services/education/education.service';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';

@Component({
	selector: 'app-add-education-modal',
	templateUrl: './add-education.modal.html',
})

export class AddEducationModal implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('closeEducationButton') 
	public closeEducationButton: ElementRef;

	@Output() 
	public saved: EventEmitter<Education> = new EventEmitter();

	public isSaving: boolean = false;
    public educationForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private educationService: EducationService,
		private formBuilder: FormBuilder,
		private formValidatorService: FormValidatorService,
	) {
		this.educationForm = this.formBuilder.group({
            schoolName: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            address: [{
                value: '',
                disabled: this.isSaving,
            }],
			degree: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
			course: [{
                value: '',
                disabled: this.isSaving,
            }],
			graduateDate: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
        });
	}

	get schoolName() {

		return this.educationForm.get('schoolName');
	}

	get address() {

		return this.educationForm.get('address');
	}

	get degree() {

		return this.educationForm.get('degree');
	}

	get course() {

		return this.educationForm.get('course');
	}

	get graduateDate() {

		return this.educationForm.get('graduateDate');
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
	
	public didSave(event: Event) {

		event.preventDefault();

        this.isSaving = true;

        if (this.educationForm.invalid) {
			this.formValidatorService.validateAllFields(this.educationForm);
			this.isSaving = false;
			return;
		}

        const educationPayload: EducationRequest = {
            school_name: this.schoolName?.value,
            address: this.address?.value,
            degree: this.degree?.value,
            course: this.course?.value === '' ? this.degree?.value : this.course?.value,
            graduate_date: this.graduateDate?.value,
        };

        const createEducation$ = this.educationService.create(educationPayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
					const education: Education = response.result;
                    if (education) {
                        this.saved.emit(education);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(createEducation$);

		this.closeEducationButton.nativeElement.click();
	}
}
