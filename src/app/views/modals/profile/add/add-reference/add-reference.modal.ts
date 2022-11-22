
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, SubscriptionLike } from 'rxjs';
import { Reference } from 'src/app/models/entities/reference.model';
import { ReferenceRequest } from 'src/app/models/requests/reference.model';
import { FormValidatorService } from 'src/app/services/form-validator/form-validator';
import { ReferenceService } from 'src/app/services/reference/reference.service';

@Component({
	selector: 'app-add-reference-modal',
	templateUrl: './add-reference.modal.html',
})

export class AddReferenceModal implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('closeReferenceButton') 
	public closeReferenceButton: ElementRef;

	@Output() 
	public saved: EventEmitter<any> = new EventEmitter();

	public isSaving: boolean = false;
    public referenceForm: FormGroup;

	private subscriptions: SubscriptionLike[] = [];

	constructor(
		private referenceService: ReferenceService,
		private formBuilder: FormBuilder,
		private formValidatorService: FormValidatorService,
	) {
		this.referenceForm = this.formBuilder.group({
            name: [{
                value: '',
                disabled: this.isSaving,
            }, [
                Validators.required,
            ]],
            contactNumber: [{
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

	get name() {

		return this.referenceForm.get('name');
	}

	get contactNumber() {

		return this.referenceForm.get('contactNumber');
	}
	
	public didSave(event: Event) {

		event.preventDefault();

        this.isSaving = true;

        if (this.referenceForm.invalid) {
			this.formValidatorService.validateAllFields(this.referenceForm);
			this.isSaving = false;
			return;
		}

        const referencePayload: ReferenceRequest = {
            name: this.name?.value,
            contact_number: this.contactNumber?.value,
        };

        const createReference$ = this.referenceService.create(referencePayload)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (response: Response | any) => {
					const reference: Reference = response.result;
                    if (reference) {
                        this.saved.emit(reference);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                },   
            });
		this.subscriptions.push(createReference$);

		this.closeReferenceButton.nativeElement.click();
	}
}
